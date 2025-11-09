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

# Install dependencies and cache config
RUN composer install --no-interaction --prefer-dist --optimize-autoloader
RUN php artisan key:generate
RUN php artisan config:cache

# Expose port
EXPOSE 80

# Start Apache
CMD ["apache2-foreground"]
