import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import connectDB from "@/lib/db";
import Site from "@/models/Site";

// GET - Fetch site data
export async function GET() {
  try {
    await connectDB();
    
    let site = await Site.findOne();
    
    // If no site data exists, create default from current site.ts
    if (!site) {
      const defaultSite = {
        name: "John Rave O. Camarines",
        title: "BSIT Student • Developer",
        location: "Dolores, Quezon Province, Philippines",
        email: "janjancamarines@gmail.com",
        socials: {
          github: "https://github.com/Henchman17",
          linkedin: "www.linkedin.com/in/camarines-john-rave-o-b774483b0",
          facebook: "https://www.facebook.com/john.rave.75470"
        },
        shortBio: "I build systems and apps that solve real problems — focused on clean UI, reliable backend, and practical features.",
        resumePath: "/resume.pdf",
        profile: {
          coverImage: "/images/banner.png",
          avatar: "/images/avatar.jpg",
          username: "johnrave.camarines",
          followers: "1.2K",
          following: 843,
          joined: "January 2020",
          work: "BSIT Student at Pamantasan ng Lungsod ng San Pablo",
          education: "Lusacan National High School",
          relationship: "Single"
        }
      };
      
      site = await Site.create(defaultSite);
    }
    
    return NextResponse.json(site);
  } catch (error) {
    console.error("Error fetching site:", error);
    return NextResponse.json({ error: "Failed to fetch site data" }, { status: 500 });
  }
}

// PUT - Update site data (protected)
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession();
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    await connectDB();
    const data = await request.json();
    
    let site = await Site.findOne();
    
    if (site) {
      Object.assign(site, data);
      await site.save();
    } else {
      site = await Site.create(data);
    }
    
    return NextResponse.json(site);
  } catch (error) {
    console.error("Error updating site:", error);
    return NextResponse.json({ error: "Failed to update site data" }, { status: 500 });
  }
}
