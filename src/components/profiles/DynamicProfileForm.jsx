'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { getFieldDefinitions } from '@/lib/api';
import styles from './DynamicProfileForm.module.css';

// Input components (TextInput, TextAreaInput, SelectInput, SliderInput, MultiSelectInput)
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
            maxLength={field.char_limit || field.validation?.maxLength}
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
            maxLength={field.char_limit || field.validation?.maxLength}
        />
         {field.helperText && <p className={styles.helperText}>{field.helperText}</p>}
    </div>
);

const SelectInput = ({ field, value, onChange }) => {
    // Parse field_options if it's a JSON string
    const options = field.field_options ? 
        (typeof field.field_options === 'string' ? JSON.parse(field.field_options) : field.field_options) : 
        (field.options || []);
    
    return (
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
                {options.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                ))}
            </select>
            {field.helperText && <p className={styles.helperText}>{field.helperText}</p>}
        </div>
    );
};

const SliderInput = ({ field, value, onChange }) => {
    const min = field.slider_min || 1;
    const max = field.slider_max || 10;
    const labels = field.slider_labels ? 
        (typeof field.slider_labels === 'string' ? JSON.parse(field.slider_labels) : field.slider_labels) : 
        {};
    
    return (
        <div className={styles.fieldWrapper}>
            <label htmlFor={field.field_key} className={styles.label}>{field.field_label}</label>
            <div className={styles.sliderContainer}>
                <div className={styles.sliderLabels}>
                    <span>{labels[min] || min}</span>
                    <span>{labels[max] || max}</span>
                </div>
                <input
                    type="range"
                    id={field.field_key}
                    name={field.field_key}
                    min={min}
                    max={max}
                    value={value || min}
                    onChange={onChange}
                    required={!!field.is_required}
                    className={styles.slider}
                />
                <div className={styles.sliderValue}>{value || min}</div>
            </div>
            {field.helperText && <p className={styles.helperText}>{field.helperText}</p>}
        </div>
    );
};

const MultiSelectInput = ({ field, value, onChange }) => {
    // Parse field_options if it's a JSON string
    const options = field.field_options ? 
        (typeof field.field_options === 'string' ? JSON.parse(field.field_options) : field.field_options) : 
        (field.options || []);
    
    // Value should be an array for multi-select
    const selectedValues = Array.isArray(value) ? value : (value ? [value] : []);
    
    const handleCheckboxChange = (option) => {
        const newValues = selectedValues.includes(option)
            ? selectedValues.filter(v => v !== option)
            : [...selectedValues, option];
        
        // Create a synthetic event to maintain compatibility with onChange handler
        const syntheticEvent = {
            target: {
                name: field.field_key,
                value: newValues,
                type: 'checkbox'
            }
        };
        onChange(syntheticEvent);
    };
    
    return (
        <div className={styles.fieldWrapper}>
            <label className={styles.label}>{field.field_label}</label>
            <div className={styles.multiSelectContainer}>
                {options.map((option, index) => (
                    <label key={index} className={styles.checkboxLabel}>
                        <input
                            type="checkbox"
                            checked={selectedValues.includes(option)}
                            onChange={() => handleCheckboxChange(option)}
                            className={styles.checkbox}
                        />
                        <span>{option}</span>
                    </label>
                ))}
            </div>
            {field.helperText && <p className={styles.helperText}>{field.helperText}</p>}
        </div>
    );
};

const MAX_RETRIES = 3;
const INITIAL_DELAY_MS = 500;

const DynamicProfileForm = ({ profileType, initialData = {}, onSubmit, submitButtonText = "Submit", isSubmitting = false }) => {
    const [fieldDefinitions, setFieldDefinitions] = useState({ essential: [], extra: [] });
    const [showingExtra, setShowingExtra] = useState(false);
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
                    
                    // Handle both old flat array format and new categorized format
                    if (Array.isArray(definitions)) {
                        // Old format - treat all as essential
                        setFieldDefinitions({ essential: definitions, extra: [] });
                    } else if (definitions && definitions.essential && definitions.extra) {
                        // New categorized format
                        setFieldDefinitions({
                            essential: definitions.essential || [],
                            extra: definitions.extra || []
                        });
                    } else {
                        setFieldDefinitions({ essential: [], extra: [] });
                    }
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
        const allFields = [...(fieldDefinitions.essential || []), ...(fieldDefinitions.extra || [])];
        if (!isLoading && !error && allFields.length > 0) { 
            // Check if formData needs initialization or reset based on definitions
            const currentKeys = Object.keys(formData).sort().join(',');
            const definitionKeys = allFields.map(f => f.field_key).sort().join(',');
            
            if (currentKeys !== definitionKeys || Object.keys(formData).length === 0) {
                 console.log("Initializing formData based on new definitions and initialData...");
                 const initialFormState = allFields.reduce((acc, field) => {
                    // Handle multi_select fields - initialize as empty array
                    if (field.field_type === 'multi_select') {
                        acc[field.field_key] = memoizedInitialData[field.field_key] ?? [];
                    } else {
                        acc[field.field_key] = memoizedInitialData[field.field_key] ?? field.defaultValue ?? '';
                    }
                    return acc;
                }, {});
                 setFormData(initialFormState);
            }
        } else if (!isLoading && allFields.length === 0) {
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
            [name]: type === 'checkbox' ? (Array.isArray(value) ? value : checked) : value
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

     const allFields = [...(fieldDefinitions.essential || []), ...(fieldDefinitions.extra || [])];
     if (!isLoading && allFields.length === 0 && !error) {
        return <div className={styles.warningText}>No form fields are defined for profile type: {profileType}.</div>;
    }

    const renderField = (field) => {
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
            case 'dropdown':
                return <SelectInput key={field.field_key} field={field} value={value} onChange={handleChange} />;
            case 'slider':
                return <SliderInput key={field.field_key} field={field} value={value} onChange={handleChange} />;
            case 'multi_select':
                return <MultiSelectInput key={field.field_key} field={field} value={value} onChange={handleChange} />;
            case 'json_array':
                return <TextAreaInput key={field.field_key} field={{...field, field_label: `${field.field_label} (comma-separated)`}} value={value} onChange={handleChange} />;
            default:
                console.warn(`Unsupported field type: ${field.field_type} for key ${field.field_key}`);
                return <div key={field.field_key} className={styles.warningText}>Unsupported field type: {field.field_type}</div>;
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Essential Fields */}
            {fieldDefinitions.essential && fieldDefinitions.essential.length > 0 && (
                <div className={styles.fieldSection}>
                    <h3 className={styles.sectionTitle}>Essential Information</h3>
                    {fieldDefinitions.essential.map(renderField)}
                </div>
            )}
            
            {/* Extra Fields */}
            {fieldDefinitions.extra && fieldDefinitions.extra.length > 0 && (
                <div className={styles.fieldSection}>
                    {!showingExtra ? (
                        <button 
                            type="button" 
                            className={styles.showMoreButton}
                            onClick={() => setShowingExtra(true)}
                        >
                            Show More Details ({fieldDefinitions.extra.length} more fields)
                        </button>
                    ) : (
                        <>
                            <div className={styles.sectionHeader}>
                                <h3 className={styles.sectionTitle}>Additional Details</h3>
                                <button 
                                    type="button" 
                                    className={styles.showLessButton}
                                    onClick={() => setShowingExtra(false)}
                                >
                                    Show Less
                                </button>
                            </div>
                            {fieldDefinitions.extra.map(renderField)}
                        </>
                    )}
                </div>
            )}
            
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