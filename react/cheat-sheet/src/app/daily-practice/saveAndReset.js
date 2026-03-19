#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require('fs');
const path = require('path');

// Template content for the reset file
const TEMPLATE_CONTENT = `'use client'

import React from 'react';

//Endpoint with post data
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ENDPOINT = "https://jsonplaceholder.typicode.com/posts"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

const PostFiltering = () => {


    return (
        <div>This is a practice component</div>
    )
}


export default PostFiltering
`;

// Get today's date components
function getDateComponents() {
    const today = new Date();
    const year = String(today.getFullYear());
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const fullDate = `${year}-${month}-${day}`;
    return { year, month, day, fullDate };
}

function saveAndReset() {
    const currentDir = __dirname;
    const reactPracticeFile = path.join(currentDir, 'reactPractice.tsx');
    
    // Check if reactPractice.tsx exists
    if (!fs.existsSync(reactPracticeFile)) {
        console.error('Error: reactPractice.tsx not found!');
        process.exit(1);
    }
    
    // Create nested directory structure: year/month/date
    const { year, month, fullDate } = getDateComponents();
    const yearDir = path.join(currentDir, year);
    const monthDir = path.join(yearDir, month);
    const dateDir = path.join(monthDir, fullDate);
    
    // Create the full directory path (recursive: true will create all parent directories)
    if (!fs.existsSync(dateDir)) {
        fs.mkdirSync(dateDir, { recursive: true });
        console.log(`✓ Created directory structure: ${year}/${month}/${fullDate}`);
    } else {
        console.log(`Directory ${year}/${month}/${fullDate} already exists`);
    }
    
    // Copy the current reactPractice.tsx to the dated directory
    const destinationFile = path.join(dateDir, 'reactPractice.tsx');
    fs.copyFileSync(reactPracticeFile, destinationFile);
    console.log(`✓ Saved current practice to: ${year}/${month}/${fullDate}/reactPractice.tsx`);
    
    // Reset reactPractice.tsx to template
    fs.writeFileSync(reactPracticeFile, TEMPLATE_CONTENT);
    console.log('✓ Reset reactPractice.tsx to original state');
    
    console.log('\n✨ All done! Ready for tomorrow\'s practice.');
}

// Run the script
try {
    saveAndReset();
} catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
}
