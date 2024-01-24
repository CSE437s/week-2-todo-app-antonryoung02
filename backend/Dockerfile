# Step 1: Use the official Python base image
FROM python:3.9

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy the dependencies file
COPY requirements.txt .

# Step 4: Install any dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Step 5: Copy the rest of your app's source code
COPY . .

# Step 6: Expose the port the app runs on
EXPOSE 8000

# Step 7: Run the application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]