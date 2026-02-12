import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import connectDB from "@/lib/db";
import Credentials from "@/models/Credentials";

// GET - Fetch credentials
export async function GET() {
  try {
    await connectDB();
    
    let credentials = await Credentials.findOne();
    
    // If no credentials exist, return empty structure
    if (!credentials) {
      return NextResponse.json({
        certifications: [],
        education: [],
        skills: []
      });
    }
    
    return NextResponse.json(credentials);
  } catch (error) {
    console.error("Error fetching credentials:", error);
    return NextResponse.json({ error: "Failed to fetch credentials" }, { status: 500 });
  }
}

// PUT - Update credentials (protected)
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession();
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    await connectDB();
    const data = await request.json();
    
    let credentials = await Credentials.findOne();
    
    if (credentials) {
      Object.assign(credentials, data);
      await credentials.save();
    } else {
      credentials = await Credentials.create(data);
    }
    
    return NextResponse.json(credentials);
  } catch (error) {
    console.error("Error updating credentials:", error);
    return NextResponse.json({ error: "Failed to update credentials" }, { status: 500 });
  }
}
