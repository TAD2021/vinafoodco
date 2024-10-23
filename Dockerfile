# Use Node.js image as the base
FROM node:20
# Set the working directory
WORKDIR /app

# Copy only package.json and package-lock.json for efficient caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port Next.js runs on
EXPOSE 3000

# Start the Next.js development server
CMD ["npm", "run", "dev"]
