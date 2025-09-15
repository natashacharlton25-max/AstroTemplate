#!/usr/bin/env node

import { promises as fs } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = resolve(__dirname, '..');

async function copyServerFiles() {
  try {
    console.log('🔄 Post-build: Copying server files to expected Vercel location...');
    
    const sourceDir = resolve(projectRoot, '.vercel/output/functions/_render.func/dist/server');
    const targetDir = resolve(projectRoot, 'dist/server');
    
    // Check if source directory exists
    try {
      await fs.access(sourceDir);
    } catch (error) {
      console.log('⚠️  No Vercel server files found, skipping copy operation');
      return;
    }
    
    // Create target directory
    await fs.mkdir(targetDir, { recursive: true });
    
    // Copy all files from source to target
    const files = await fs.readdir(sourceDir, { withFileTypes: true });
    
    for (const file of files) {
      const sourcePath = resolve(sourceDir, file.name);
      const targetPath = resolve(targetDir, file.name);
      
      if (file.isDirectory()) {
        // Recursively copy directories
        await fs.cp(sourcePath, targetPath, { recursive: true });
      } else {
        // Copy files
        await fs.copyFile(sourcePath, targetPath);
      }
    }
    
    console.log('✅ Successfully copied server files to dist/server/');
    console.log(`   Source: ${sourceDir}`);
    console.log(`   Target: ${targetDir}`);
    
  } catch (error) {
    console.error('❌ Error copying server files:', error.message);
    process.exit(1);
  }
}

// Run the copy operation
copyServerFiles();