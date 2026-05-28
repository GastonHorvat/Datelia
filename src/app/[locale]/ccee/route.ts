import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(
  request: Request,
  context: { params: Promise<{ locale: string }> }
) {
  try {
    // Await the params as per Next.js 15 specifications
    const { locale } = await context.params;
    
    // Resolve the file path in the public directory
    const filePath = path.join(process.cwd(), 'public', 'Kit Datelia para CCEE.html');
    
    // Read the HTML file synchronously
    const htmlContent = fs.readFileSync(filePath, 'utf8');
    
    // Return the HTML content with the proper content-type header
    return new NextResponse(htmlContent, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
      },
    });
  } catch (error) {
    console.error('Error serving CCEE HTML file:', error);
    return new NextResponse('File not found', { status: 404 });
  }
}
