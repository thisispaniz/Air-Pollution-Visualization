# Use an official Python runtime as a parent image
FROM python:3.12.1-bookworm

# Set the working directory in the container
WORKDIR /app

# Copy only the requirements file to optimize caching
COPY requirements.txt .

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code into the container
COPY . .

# Expose the port that Uvicorn will run on
EXPOSE 8000

# Create a script to run uvicorn on container start
RUN echo "#!/bin/bash" > entrypoint.sh && \
    echo "uvicorn main:app --host 0.0.0.0 --port 8000 --reload" >> entrypoint.sh && \
    chmod +x entrypoint.sh

# Set the entry point to the script
ENTRYPOINT ["/app/entrypoint.sh"]
