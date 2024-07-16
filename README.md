# Struggle Bus App

## Table of Contents

- [Introduction](#introduction)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Pages](#pages)
- [Purpose](#purpose)
- [Testing](#testing)

## Introduction

The Stuggle Bus App is a web application designed to help fleet managers oversee and maintain their vehicle fleets. This application allows users to view all vehicles in the fleet, check individual vehicle details, and track maintenance requirements and schedules.

## Technologies Used

- React
- React Routing
- React Testing Library
- Chakra

## Features

- **View Fleet:** Display a list of all vehicles in the fleet with essential details like year, make, model, and VIN.
- **Vehicle Details:** View detailed information about individual vehicles, including images, specifications, and maintenance requirements.
- **Maintenance Tracking:** Keep track of maintenance schedules and requirements for each vehicle.
- **Search and Filter:** Easily search and filter vehicles based on various criteria.
- **Car News:** Displays a field of images and links to news articles regarding vehicles.

## Installation

### Prerequisites

- Node.js (LTS)
- npm

### Steps

1. **Fork and Clone the Repository:**

   ```sh
   git clone https://github.com/yourusername/struggle-bus-app.git

   ```

2. **Navigate to the Locally Cloned Repo:**
   cd struggle-bus-app

3. **Open the Cloned Repo in VSCode:**
   Open Visual Studio Code (VSCode).
   Select `File > Open Folder` and choose the cloned repo directory.

4. **Install Dependencies:**
   Using the terminal in VSCode, run the following commands:

   ```sh
   npm install
   ```

5. **Start the Development Server:**

   ```sh
   npm start
   ```

6. **Open the App in Your Browser:**
   Open your preferred web browser
   In the address bar, type: http://localhost:3000/ and press enter to navigate to the index page.

## Usage

### Viewing the Fleet

1. Navigate to the homepage to view a list of all vehicles in the fleet.
2. Use the search bar to filter vehicles by year, make, model, or VIN.

### Viewing Vehicle Details

1. Click on the information button next to a vehicle to view detailed information about that vehicle.
2. The details page will display maintenance requirements and other relevant information.

### Adding a Vehicle to the Fleet

1. Navigate to the Approved Vehicle List Page.
2. Manipulate the year, make, and model filters to find the desired vehicle.
3. Under the 'ACTIONS' heading, click the blue plus button.

### Removing a Vehicle from the Fleet

1. Navigate to the homepage to see the vehicles currently in your fleet.
2. Under the 'ACTIONS' heading on the far right, click the red trashcan button.

## Purpose

Fundamentally, this app serves as a fleet management tool for a DoD GOV fleet manager to add, remove,
compare, and track approved vehicles to, from, and in their fleet. The user can manipulate this functionality
towards vehicle purchasing, maintenance, management, and tracking.

## Pages

### Index

The index page of the app consists of the vehicles currently in the user's fleet and can be used to navigate to the pages of individual vehicles in the fleet.

### Approved Vehicle List

The approved vehicles list page can be used to browse approved vehicles and add the desired vehicles to the user's current fleet. Additionally, this page can also be used to
navigate to the individual vehicle pages.

### Vehicle

The individual vehicle pages can be used to view the appearance, specifications, and maintenance information for the selected vehicle.

### Car News

The car news page lists a set of links for users to find relevant news concerning vehicles that may currently be in their fleet or that they are considering.

## Testing

### Starting the Test

1. Open a new bash terminal in VSCode
   - `CTRL/CMND + SHIFT + ~`
2. Run the test code

   ```sh
   npm test
   ```
