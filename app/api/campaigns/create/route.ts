//API route to handle POST requests to create a new campaign
//
//Receive data from form submission and insert it into the database 
//
//Neon database is used for this application
//
//The database URL is stored in the DATABASE_URL environment variable

import { neon } from '@neondatabase/serverless';
import {createCampaign} from '@/app/lib/action';
import {redirect} from 'next/navigation'
import { NextRequest, NextResponse } from 'next/server';

export  async function POST(req: NextRequest) {
    try {
      const data = await req.json();
      const id = await createCampaign(data);
    //redirect to /campaigns on successi
    //redirect(`/campaigns`);
        const url = req.nextUrl.clone()
        url.pathname = `/campaigns/${id}`
        return NextResponse.json({'id': id})
      //return NextResponse.redirect(`/campaigns/${id}`, 307);
      //res.status(201).end();
    } catch (error) {
      console.error('Database Error:', error);
      return Response.error('Failed to create campaign');
      //res.status(500).end();
    }
  } 
