document.addEventListener('DOMContentLoaded', () => {
    const dietForm = document.getElementById('diet-form');
    const dietPlan = document.getElementById('diet-plan');
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // --- Dark Mode Logic ---
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const theme = body.classList.contains('dark-mode') ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
    });

    // --- Recommendation Logic ---
    dietForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const goal = document.getElementById('goal').value;
        const diet = document.getElementById('diet').value;

        const recommendation = getRecommendation(goal, diet);
        dietPlan.innerHTML = recommendation;
        
        // Scroll to results
        document.getElementById('recommendation').scrollIntoView({ behavior: 'smooth' });
    });

    function getRecommendation(goal, diet) {
        let meals = {
            breakfast: '',
            lunch: '',
            dinner: '',
            snack: ''
        };

        // Base recommendations based on goal
        if (goal === 'weight-loss') {
            meals.breakfast = 'Oatmeal with fresh berries and a sprinkle of chia seeds';
            meals.lunch = 'Grilled chicken breast with a large mixed green salad';
            meals.dinner = 'Baked salmon with steamed asparagus and cauliflower rice';
            meals.snack = 'A small handful of almonds or a piece of fruit';
        } else if (goal === 'muscle-gain') {
            meals.breakfast = 'Scrambled eggs (3) with spinach, mushrooms, and whole-wheat toast';
            meals.lunch = 'Quinoa bowl with black beans, roasted sweet potatoes, and sliced avocado';
            meals.dinner = 'Lean ground turkey stir-fry with broccoli, bell peppers, and brown rice';
            meals.snack = 'Greek yogurt with honey and granola';
        } else {
            meals.breakfast = 'Whole-grain pancakes with sliced bananas and a drizzle of maple syrup';
            meals.lunch = 'Turkey and swiss cheese wrap with plenty of crisp vegetables';
            meals.dinner = 'Whole-wheat pasta with homemade marinara and grilled zucchini';
            meals.snack = 'Hummus with carrot sticks and cucumber slices';
        }

        // Apply dietary restrictions
        if (diet === 'vegetarian') {
            meals.lunch = meals.lunch.replace('chicken breast', 'grilled tofu');
            meals.dinner = meals.dinner.replace('salmon', 'tempeh steaks').replace('ground turkey', 'lentil mix');
            if (goal === 'weight-loss') meals.breakfast = 'Greek yogurt with berries and flax seeds';
        } else if (diet === 'vegan') {
            meals.breakfast = meals.breakfast.replace('eggs', 'tofu scramble').replace('Greek yogurt', 'coconut yogurt').replace('honey', 'agave');
            meals.lunch = meals.lunch.replace('chicken breast', 'chickpeas').replace('cheese', 'vegan cheese');
            meals.dinner = meals.dinner.replace('salmon', 'marinated tofu').replace('ground turkey', 'textured vegetable protein').replace('meatballs', 'mushroom balls');
            meals.snack = meals.snack.replace('Greek yogurt', 'almond milk yogurt');
        } else if (diet === 'gluten-free') {
            meals.breakfast = meals.breakfast.replace('whole-wheat toast', 'gluten-free toast').replace('pancakes', 'gluten-free pancakes');
            meals.lunch = meals.lunch.replace('wrap', 'lettuce wrap');
            meals.dinner = meals.dinner.replace('Whole-wheat pasta', 'Chickpea pasta').replace('brown rice', 'quinoa');
        }

        return `
            <p>Based on your goal of <strong>${goal.replace('-', ' ')}</strong> and <strong>${diet}</strong> diet preference:</p>
            <ul>
                <li><strong>Breakfast:</strong> ${meals.breakfast}</li>
                <li><strong>Lunch:</strong> ${meals.lunch}</li>
                <li><strong>Dinner:</strong> ${meals.dinner}</li>
                <li><strong>Snack:</strong> ${meals.snack}</li>
            </ul>
            <p style="font-size: 0.9rem; margin-top: 1rem; opacity: 0.8;"><em>Note: Always consult with a nutritionist for personalized medical advice.</em></p>
        `;
    }
});
