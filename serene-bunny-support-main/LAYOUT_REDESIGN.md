# Mental Wellness App Layout Redesign

## Overview
The mental wellness app has been redesigned with a new layout flow that focuses on the chatbot as the main interface while providing easy access to dashboard features.

## New Layout Structure

### Initial State
- **Chatbot**: Centered on the main screen as the primary focus
- **Right Sidebar**: Contains only two main options:
  - Login (Student/Faculty)
  - Dashboard toggle

### Dashboard Interaction
When the Dashboard button is clicked:
1. **Chatbot Movement**: The chatbot smoothly moves upward to occupy the top half of the center screen
2. **Dashboard Slide-in**: Dashboard features slide in from the right, filling the bottom half of the center screen
3. **Smooth Transitions**: All movements use CSS animations with 700ms duration for natural feel

## Key Features

### Chat Interface
- Full-featured chatbot with voice input/output
- Quick response buttons
- Multilingual support
- Mood tracking
- Wellness suggestions
- Emergency support access

### Dashboard Features
- Quick Actions (Chat, Mood Check, Study Help, Sleep Log)
- Today's Wellness Plan with task tracking
- Sleep Tracker with quality metrics
- Mood Overview with weekly trends
- Community activity feed
- Search functionality with popular tags

### Responsive Design
- Clean, minimal interface
- Consistent with existing theme
- Smooth animations and transitions
- Mobile-friendly layout

## Technical Implementation

### Components
- `MainLayout.tsx`: Main layout component handling the state and transitions
- `MainPage.tsx`: Page component that uses MainLayout
- Updated routing in `App.tsx`

### Animations
- CSS transitions for smooth movement
- Slide-in animations for dashboard
- Hover effects and micro-interactions
- Custom keyframes for natural motion

### State Management
- React state for dashboard visibility
- Smooth transitions between states
- Preserved chat history and user interactions

## Usage
1. Navigate to the root path (`/`) to see the new layout
2. The chatbot is immediately available for interaction
3. Click "Show Dashboard" in the right sidebar to reveal dashboard features
4. Click "Hide Dashboard" to return to full-screen chat mode

## Benefits
- **Focused Experience**: Chatbot remains the primary interface
- **Easy Access**: Dashboard features are one click away
- **Smooth UX**: Natural transitions enhance user experience
- **Clean Design**: Minimal, uncluttered interface
- **Consistent Theme**: Maintains the existing design language
