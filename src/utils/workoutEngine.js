export const EXERCISES = [
  { id: 'ex1', name: 'Pushups', category: 'Chest', difficulty: 'Beginner', instructions: 'Maintain a straight line from head to heels.' },
  { id: 'ex2', name: 'Bench Press', category: 'Chest', difficulty: 'Intermediate', instructions: 'Lower bar to mid-chest.' },
  { id: 'ex3', name: 'Pullups', category: 'Back', difficulty: 'Intermediate', instructions: 'Full range of motion, chin over bar.' },
  { id: 'ex4', name: 'Bodyweight Squats', category: 'Legs', difficulty: 'Beginner', instructions: 'Keep your chest up and back straight.' },
  { id: 'ex5', name: 'Deadlift', category: 'Back', difficulty: 'Advanced', instructions: 'Lift with your legs, keep back flat.' },
  { id: 'ex6', name: 'Plank', category: 'Core', difficulty: 'Beginner', instructions: 'Hold a pushup position on your forearms.' },
  { id: 'ex7', name: 'Bicep Curls', category: 'Arms', difficulty: 'Beginner', instructions: 'Squeeze at the top of the movement.' },
  { id: 'ex8', name: 'Shoulder Press', category: 'Shoulders', difficulty: 'Intermediate', instructions: 'Press dumbbells overhead until arms are straight.' },
  { id: 'ex9', name: 'Lunges', category: 'Legs', difficulty: 'Beginner', instructions: 'Step forward and lower hips.' },
  { id: 'ex10', name: 'Dips', category: 'Arms', difficulty: 'Intermediate', instructions: 'Lower yourself until elbows are at 90 degrees.' },
  { id: 'ex11', name: 'Burpees', category: 'Cardio', difficulty: 'Intermediate', instructions: 'Squat, jump back, pushup, jump forward, jump up.' },
  { id: 'ex12', name: 'Mountain Climbers', category: 'Cardio', difficulty: 'Beginner', instructions: 'Drive knees towards chest in a plank.' },
  { id: 'ex13', name: 'Lat Pulldowns', category: 'Back', difficulty: 'Beginner', instructions: 'Pull the bar down to your upper chest.' },
  { id: 'ex14', name: 'Leg Press', category: 'Legs', difficulty: 'Intermediate', instructions: 'Push the platform away using your heels.' },
];

export const generateWorkoutPlan = (profile) => {
  const { fitnessLevel, goal } = profile;
  
  // Basic splits based on goals
  const splits = {
    'Weight Loss': ['Full Body + Cardio', 'Core + HIIT', 'Rest', 'Full Body + Cardio', 'Core + HIIT', 'Active Recovery', 'Rest'],
    'Muscle Gain': ['Chest & Triceps', 'Back & Biceps', 'Rest', 'Legs', 'Shoulders & Core', 'Rest', 'Full Body'],
    'Strength': ['Upper Power', 'Lower Power', 'Rest', 'Upper Hypertrophy', 'Lower Hypertrophy', 'Rest', 'Full Body'],
    'General Fitness': ['Upper Body', 'Lower Body', 'Rest', 'Cardio & Core', 'Full Body', 'Rest', 'Rest']
  };

  const plan = splits[goal] || splits['General Fitness'];
  
  return plan.map((dayName, index) => {
    if (dayName === 'Rest' || dayName === 'Active Recovery') {
      return { day: index + 1, name: dayName, exercises: [] };
    }
    
    // Filter exercises based on category and difficulty
    // A simplified logic for the demo:
    let dayExercises = [];
    if (dayName.includes('Chest')) {
        dayExercises = EXERCISES.filter(ex => ex.category === 'Chest' || ex.category === 'Arms');
    } else if (dayName.includes('Back')) {
        dayExercises = EXERCISES.filter(ex => ex.category === 'Back' || ex.category === 'Arms');
    } else if (dayName.includes('Legs')) {
        dayExercises = EXERCISES.filter(ex => ex.category === 'Legs');
    } else if (dayName.includes('Full Body')) {
        dayExercises = [
            ...EXERCISES.filter(ex => ex.category === 'Chest').slice(0, 1),
            ...EXERCISES.filter(ex => ex.category === 'Back').slice(0, 1),
            ...EXERCISES.filter(ex => ex.category === 'Legs').slice(0, 1),
            ...EXERCISES.filter(ex => ex.category === 'Core').slice(0, 1),
        ];
    } else {
        dayExercises = EXERCISES.slice(0, 4);
    }

    // Adjust reps/sets based on level
    const difficultyMultiplier = {
        'Beginner': { sets: 2, reps: 10, rest: 90 },
        'Intermediate': { sets: 3, reps: 12, rest: 60 },
        'Advanced': { sets: 4, reps: 15, rest: 45 },
    }[fitnessLevel] || { sets: 3, reps: 12, rest: 60 };

    return {
      day: index + 1,
      name: dayName,
      exercises: dayExercises.map(ex => ({
        ...ex,
        sets: difficultyMultiplier.sets,
        reps: difficultyMultiplier.reps,
        rest: difficultyMultiplier.rest
      }))
    };
  });
};
