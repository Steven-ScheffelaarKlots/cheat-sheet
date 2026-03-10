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

// Get today's date in YYYY-MM-DD format
function getTodaysDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function saveAndReset() {
    const currentDir = __dirname;
    const reactPracticeFile = path.join(currentDir, 'reactPractice.tsx');
    
    // Check if reactPractice.tsx exists
    if (!fs.existsSync(reactPracticeFile)) {
        console.error('Error: reactPractice.tsx not found!');
        process.exit(1);
    }
    
    // Create dated directory
    const todaysDate = getTodaysDate();
    const dateDir = path.join(currentDir, todaysDate);
    
    if (!fs.existsSync(dateDir)) {
        fs.mkdirSync(dateDir, { recursive: true });
        console.log(`✓ Created directory: ${todaysDate}`);
    } else {
        console.log(`Directory ${todaysDate} already exists`);
    }
    
    // Copy the current reactPractice.tsx to the dated directory
    const destinationFile = path.join(dateDir, 'reactPractice.tsx');
    fs.copyFileSync(reactPracticeFile, destinationFile);
    console.log(`✓ Saved current practice to: ${todaysDate}/reactPractice.tsx`);
    
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
