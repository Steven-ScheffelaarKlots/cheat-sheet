#!/usr/bin/env node

import { existsSync, mkdirSync, copyFileSync, writeFileSync } from 'fs';
import { join } from 'path';

// Template content for the reset file
const TEMPLATE_CONTENT = `'use client'

import React from 'react';

//Endpoint with post data
const ENDPOINT = "https://jsonplaceholder.typicode.com/posts"

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
    const reactPracticeFile = join(currentDir, 'reactPractice.tsx');
    
    // Check if reactPractice.tsx exists
    if (!existsSync(reactPracticeFile)) {
        console.error('Error: reactPractice.tsx not found!');
        process.exit(1);
    }
    
    // Create dated directory
    const todaysDate = getTodaysDate();
    const dateDir = join(currentDir, todaysDate);
    
    if (!existsSync(dateDir)) {
        mkdirSync(dateDir, { recursive: true });
        console.log(`✓ Created directory: ${todaysDate}`);
    } else {
        console.log(`Directory ${todaysDate} already exists`);
    }
    
    // Copy the current reactPractice.tsx to the dated directory
    const destinationFile = join(dateDir, 'reactPractice.tsx');
    copyFileSync(reactPracticeFile, destinationFile);
    console.log(`✓ Saved current practice to: ${todaysDate}/reactPractice.tsx`);
    
    // Reset reactPractice.tsx to template
    writeFileSync(reactPracticeFile, TEMPLATE_CONTENT);
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
