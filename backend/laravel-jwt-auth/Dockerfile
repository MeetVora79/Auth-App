# Use official PHP + Composer image
FROM php:8.2-apache

# Enable Apache mod_rewrite
RUN a2enmod rewrite

# Install dependencies
RUN apt-get update && apt-get install -y \
    libpng-dev libjpeg-dev libfreetype6-dev zip git unzip \
    && docker-php-ext-install pdo pdo_mysql

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www/html

# Copy project files
COPY . .

# Install dependencies (no artisan commands yet)
RUN composer install --no-interaction --prefer-dist --optimize-autoloader

# Copy example env file and prepare it
RUN cp .env.example .env

# Generate app key and cache config safely (now .env exists)
RUN php artisan key:generate || true
RUN php artisan config:cache || true

# Permissions fix
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Expose port
EXPOSE 80

# Start Apache
CMD ["apache2-foreground"]
