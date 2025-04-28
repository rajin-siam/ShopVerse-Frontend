import csv
import os

# Function to process each CSV file and extract unique main_category values
def process_csv_for_unique_categories(csv_file):
    unique_categories = set()  # Set to store unique categories
    
    with open(csv_file, mode='r') as file:
        reader = csv.DictReader(file)
        
        # Extract unique 'main_category' values
        for row in reader:
            category_name = row['main_category']
            unique_categories.add(category_name)  # Add category to the set (ensures uniqueness)

    return unique_categories

# Path to the directory containing CSV files
csv_directory = '/path/to/csv_files/'

# Set to store unique categories from all files
all_unique_categories = set()

# Loop through all CSV files in the directory
for filename in os.listdir(csv_directory):
    if filename.endswith(".csv"):  # Only process CSV files
        file_path = os.path.join(csv_directory, filename)
        unique_categories = process_csv_for_unique_categories(file_path)
        all_unique_categories.update(unique_categories)  # Add to the global set

# Print all unique categories
print("Unique Categories:")
for category in all_unique_categories:
    print(category)
