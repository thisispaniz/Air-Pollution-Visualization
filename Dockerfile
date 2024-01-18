# Use an official Python runtime as a parent image
FROM python:3.12.1-bookworm

# Set the working directory in the container
WORKDIR /

# Install any needed packages specified in requirements.txt
RUN pip install FastAPI uvicorn

# Copy the current directory contents into the container
COPY . .

# Command to run on container start
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
