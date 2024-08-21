const { execSync } = require('child_process');
const mjml = require('mjml');
const fs = require('fs');
const path = require('path');

// Paths
const templatesDir = path.join(__dirname, '../templates');
const outputDir = path.join(__dirname, '../../html-templates');

// Ensure the output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Function to convert all MJML files in the templates directory
function convertAllMjmlToHtml() {
  // Read all files in the templates directory
  const files = fs.readdirSync(templatesDir);

  files.forEach((file) => {
    if (path.extname(file) === '.mjml') {
      const inputFilePath = path.join(templatesDir, file);
      const outputFilePath = path.join(
        outputDir,
        file.replace('.mjml', '.html')
      );

      // Read MJML content
      const mjmlContent = fs.readFileSync(inputFilePath, 'utf-8');

      // Convert MJML to HTML
      const htmlOutput = mjml(mjmlContent).html;

      // Write the HTML output to a file
      fs.writeFileSync(outputFilePath, htmlOutput);
      console.log(`Converted ${file} to HTML and saved to ${outputFilePath}`);
    }
  });
}

// Run the build-styles script and then convert MJML to HTML
function buildAndConvert() {
  try {
    console.log('Building styles...');
    execSync('npm run build-styles', { stdio: 'inherit' });

    console.log('Converting MJML to HTML...');
    convertAllMjmlToHtml();
  } catch (error) {
    console.error('Error during build or conversion:', error);
  }
}

// Execute the build and conversion process
buildAndConvert();
