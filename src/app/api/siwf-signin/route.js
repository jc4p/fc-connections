import { NextResponse } from "next/server";
import { createAppClient, viemConnector } from "@farcaster/auth-client";
import { SignJWT } from "jose";

// Force the function to run on the Edge runtime
export const runtime = 'edge';

// --- Configuration ---
const AUTH_SECRET = process.env.AUTH_SECRET;
const AUTH_URL = process.env.AUTH_URL || 'http://localhost:3000'; // Base URL for cookie domain/secure flag

if (!AUTH_SECRET) {
  console.error("CRITICAL: AUTH_SECRET environment variable is not set for JWT signing in frame-signin route!");
  // In production, you might want to prevent startup or throw an error here.
}

// Function to derive SIWE domain from AUTH_URL (same as in auth.config.js)
function getSiweDomain() {
    try {
        const url = new URL(AUTH_URL);
        return url.port ? `${url.hostname}:${url.port}` : url.hostname;
    } catch (e) {
        console.error("Invalid AUTH_URL for SIWE domain, using default localhost:3000", e);
        return "localhost:3000"; // Fallback for local dev
    }
}

export async function POST(request) {
  // ** Absolute First Line Log Check **
  console.log("Frame Sign-In: POST handler started (Edge)");
  // ** End Log Check **

  console.log("Frame Sign-In: Received request.");

  if (!AUTH_SECRET) {
      return NextResponse.json({ error: "Server configuration error (secret missing)." }, { status: 500 });
  }

  try {
    const body = await request.json();
    const { message, signature, nonce } = body;

    if (!message || !signature || !nonce) {
      console.log("Frame Sign-In: Missing message, signature, or nonce in request body.");
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    // --- Verify SIWF Message ---
    const appClient = createAppClient({
      ethereum: viemConnector(),
    });
    const siweDomain = getSiweDomain();
    console.log(`Frame Sign-In: Verifying SIWF with domain: ${siweDomain}, nonce: ${nonce}`);

    // --- Log the domain from the incoming message ---
    try {
      const messageDomainLine = message.split('\\n').find(line => line.startsWith('Domain:'));
      const messageDomain = messageDomainLine ? messageDomainLine.split(': ')[1] : 'Domain not found in message';
      console.log(`Frame Sign-In: Domain found in received message: ${messageDomain}`);
    } catch (e) {
      console.error("Frame Sign-In: Error parsing domain from message:", e);
    }
    // --- End log ---

    const verifyResponse = await appClient.verifySignInMessage({
      message,
      signature,
      domain: siweDomain,
      nonce,
    });

    if (!verifyResponse.success) {
      console.error("Frame Sign-In: SIWF verification failed:", verifyResponse.error);
      return NextResponse.json({ error: "Farcaster verification failed.", details: verifyResponse.error?.message }, { status: 401 });
    }

    const fid = verifyResponse.fid;
    console.log(`Frame Sign-In: Verification successful for FID: ${fid}`);

    // --- Manually Create Session JWT ---
    const secretKey = new TextEncoder().encode(AUTH_SECRET);
    const payload = {
      fid: fid.toString(),
      sub: fid.toString(), // Subject is the FID
      // Consider adding name/pfp here if needed later, fetched using fid
      // name: ...,
      // picture: ..., // 'picture' is often used by NextAuth for image
      iat: Math.floor(Date.now() / 1000), // Issued at time
      exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 30), // Example: 30 days expiry
    };

    const sessionJwt = await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime('30d') // Set expiration
      .sign(secretKey);

    console.log(`Frame Sign-In: Session JWT generated for FID: ${fid}`);

    const responsePayload = { success: true, fid: fid, token: sessionJwt }; 

    return NextResponse.json(responsePayload, { status: 200 });

  } catch (error) {
    console.error("Frame Sign-In: Error processing request:", error);
    return NextResponse.json({ error: "Internal server error.", details: error.message }, { status: 500 });
  }
} 