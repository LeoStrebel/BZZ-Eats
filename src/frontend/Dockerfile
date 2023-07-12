# Use a base image with Node.js for building the React app
FROM node:14 AS build

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the dependencies
RUN npm ci --silent

# Copy the source code
COPY . .

# Build the React app
RUN npm run build

# Use the official Apache base image
FROM httpd:2.4

# Copy the built static files from the build stage to the Apache server
COPY --from=build /app/build/ /usr/local/apache2/htdocs/

# Enable the mod_rewrite module
RUN sed -i 's/#LoadModule rewrite_module/LoadModule rewrite_module/' /usr/local/apache2/conf/httpd.conf

# Copy the built static files from the build stage to the Apache server
COPY .htaccess /usr/local/apache2/htdocs/

# Update the Apache configuration to allow .htaccess files
RUN sed -i '/<Directory "\/usr\/local\/apache2\/htdocs">/,/<\/Directory>/ s/AllowOverride None/AllowOverride All/' /usr/local/apache2/conf/httpd.conf

# Set the server port (optional)
EXPOSE 80

# Start the Apache server
CMD ["httpd-foreground"]
