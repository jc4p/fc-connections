'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { getFieldDefinitions } from '@/lib/api';
import styles from './DynamicProfileForm.module.css';

// Input components (TextInput, TextAreaInput, SelectInput)
const TextInput = ({ field, value, onChange }) => (
    <div className={styles.fieldWrapper}>
        <label htmlFor={field.field_key} className={styles.label}>{field.field_label}</label>
        <input
            type={field.field_type || 'text'}
            id={field.field_key}
            name={field.field_key}
            value={value || ''}
            onChange={onChange}
            required={!!field.is_required}
            className={styles.textInput}
            maxLength={field.validation?.maxLength}
            step={field.field_type === 'number' ? (field.validation?.step || 'any') : undefined}
            min={field.field_type === 'number' ? field.validation?.min : undefined}
            max={field.field_type === 'number' ? field.validation?.max : undefined}
        />
        {field.helperText && <p className={styles.helperText}>{field.helperText}</p>}
    </div>
);

const TextAreaInput = ({ field, value, onChange }) => (
     <div className={styles.fieldWrapper}>
        <label htmlFor={field.field_key} className={styles.label}>{field.field_label}</label>
        <textarea
            id={field.field_key}
            name={field.field_key}
            rows={field.rows || 3}
            value={value || ''}
            onChange={onChange}
            required={!!field.is_required}
            className={styles.textArea}
            maxLength={field.validation?.maxLength}
        />
         {field.helperText && <p className={styles.helperText}>{field.helperText}</p>}
    </div>
);

const SelectInput = ({ field, value, onChange }) => (
    <div className={styles.fieldWrapper}>
        <label htmlFor={field.field_key} className={styles.label}>{field.field_label}</label>
        <select
            id={field.field_key}
            name={field.field_key}
            value={value || ''}
            onChange={onChange}
            required={!!field.is_required}
            className={styles.select}
        >
            <option value="" disabled>{field.placeholder || 'Select...'}</option>
            {field.options?.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
            ))}
        </select>
        {field.helperText && <p className={styles.helperText}>{field.helperText}</p>}
    </div>
);

const MAX_RETRIES = 3;
const INITIAL_DELAY_MS = 500;

const DynamicProfileForm = ({ profileType, initialData = {}, onSubmit, submitButtonText = "Submit", isSubmitting = false }) => {
    const [fieldDefinitions, setFieldDefinitions] = useState([]);
    const [formData, setFormData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const memoizedInitialData = useMemo(() => initialData, [initialData]);

    // Effect 1: Fetch field definitions
    useEffect(() => {
        let isMounted = true;
        const loadDefinitions = async () => {
            if (!profileType) {
                if (isMounted) {
                    setFieldDefinitions([]);
                    setIsLoading(false);
                }
                return;
            }
            
            if (isMounted) {
                setIsLoading(true);
                setError(null);
                setFieldDefinitions([]);
            }
            
            let retries = 0;
            let success = false;
            while (retries < MAX_RETRIES && !success && isMounted) {
                try {
                    console.log(`Attempt ${retries + 1} fetching definitions for ${profileType}...`);
                    const definitions = await getFieldDefinitions(profileType);
                    if (!isMounted) return;
                    setFieldDefinitions(Array.isArray(definitions) ? definitions : []);
                    success = true;
                    console.log(`Successfully fetched definitions for ${profileType}.`);
                } catch (err) {
                    if (!isMounted) return;
                    retries++;
                    console.error(`Error fetching definitions (attempt ${retries}/${MAX_RETRIES}):`, err);
                    if (retries >= MAX_RETRIES) {
                         setError(`Failed to load form config: ${err.message}`);
                    } else {
                        const delay = INITIAL_DELAY_MS * Math.pow(2, retries - 1);
                        console.log(`Retrying in ${delay}ms...`);
                        await new Promise(resolve => setTimeout(resolve, delay));
                    }
                }
            }
            if (isMounted) {
                setIsLoading(false);
            }
        };
        loadDefinitions();
        
        return () => { isMounted = false; };
    }, [profileType]);

    // Effect 2: Initialize formData only when definitions *successfully load* or initialData changes.
    useEffect(() => {
        // Only initialize if definitions exist AND we are not loading/erroring
        if (!isLoading && !error && fieldDefinitions.length > 0) { 
            // Check if formData needs initialization or reset based on definitions
            // This comparison assumes fieldDefinitions content doesn't change without profileType changing
            // If formData keys don't match definition keys, re-initialize
            const currentKeys = Object.keys(formData).sort().join(',');
            const definitionKeys = fieldDefinitions.map(f => f.field_key).sort().join(',');
            
            if (currentKeys !== definitionKeys || Object.keys(formData).length === 0) {
                 console.log("Initializing formData based on new definitions and initialData...");
                 const initialFormState = fieldDefinitions.reduce((acc, field) => {
                    acc[field.field_key] = memoizedInitialData[field.field_key] ?? field.defaultValue ?? '';
                    return acc;
                }, {});
                 setFormData(initialFormState);
            }
        } else if (!isLoading && fieldDefinitions.length === 0) {
            // If loading finished and there are no definitions, ensure form data is empty
            setFormData({});
        }
        // Re-run only if the definition array reference *or* initial data reference changes.
        // We rely on the fetch effect setting a stable reference for fieldDefinitions on success.
    }, [fieldDefinitions, memoizedInitialData, isLoading, error]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSubmit && !isSubmitting) { 
            onSubmit(formData);
        }
    };

    if (isLoading) {
        return <div className={styles.loadingText}>Loading form configuration...</div>;
    }

    if (error) {
        return <div className={styles.errorText}>{error}</div>;
    }

     if (!isLoading && fieldDefinitions.length === 0 && !error) {
        return <div className={styles.warningText}>No form fields are defined for profile type: {profileType}.</div>;
    }

    return (
        <form onSubmit={handleSubmit}>
            {fieldDefinitions.map(field => {
                const value = formData[field.field_key]; 
                switch (field.field_type) { 
                    case 'text':
                    case 'email':
                    case 'url':
                    case 'number':
                        return <TextInput key={field.field_key} field={field} value={value} onChange={handleChange} />;
                    case 'textarea':
                        return <TextAreaInput key={field.field_key} field={field} value={value} onChange={handleChange} />;
                    case 'select':
                        return <SelectInput key={field.field_key} field={field} value={value} onChange={handleChange} />;
                    case 'json_array':
                        return <TextAreaInput key={field.field_key} field={{...field, field_label: `${field.field_label} (comma-separated)`}} value={value} onChange={handleChange} />;
                    default:
                        console.warn(`Unsupported field type: ${field.field_type} for key ${field.field_key}`);
                        return <div key={field.field_key} className={styles.warningText}>Unsupported field type: {field.field_type}</div>;
                }
            })}
            <button
                type="submit"
                className={styles.submitButton}
                disabled={isSubmitting}
            >
                {submitButtonText}
            </button>
        </form>
    );
};

export default DynamicProfileForm; 