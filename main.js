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

        const userData = {
            gender: document.getElementById('gender').value,
            height: parseFloat(document.getElementById('height').value),
            weight: parseFloat(document.getElementById('weight').value),
            age: parseInt(document.getElementById('age').value),
            goal: document.getElementById('goal').value,
            diet: document.getElementById('diet').value
        };

        const recommendation = getDetailedRecommendation(userData);
        dietPlan.innerHTML = recommendation;
        
        document.getElementById('recommendation').scrollIntoView({ behavior: 'smooth' });
    });

    function getDetailedRecommendation(data) {
        const { gender, height, weight, age, goal, diet } = data;

        // BMR Calculation (Mifflin-St Jeor)
        let bmr = (10 * weight) + (6.25 * height) - (5 * age);
        bmr = (gender === 'male') ? bmr + 5 : bmr - 161;

        // Estimated TDEE (Sedentary multiplier 1.2)
        let tdee = bmr * 1.2;
        let targetCalories = tdee;

        if (goal === 'weight-loss') targetCalories = tdee - 500;
        else if (goal === 'muscle-gain') targetCalories = tdee + 300;

        let meals = {
            breakfast: '',
            lunch: '',
            dinner: '',
            snack: ''
        };

        // Specific meal descriptions based on goal
        if (goal === 'weight-loss') {
            meals.breakfast = 'Oatmeal (40g) with 1/2 cup blueberries and 10g chia seeds';
            meals.lunch = 'Grilled chicken breast (150g) with 2 cups mixed greens and balsamic vinaigrette';
            meals.dinner = 'Baked salmon (150g) with 1 cup steamed broccoli and 1/2 cup quinoa';
            meals.snack = 'One medium apple or 15 raw almonds';
        } else if (goal === 'muscle-gain') {
            meals.breakfast = '3 Whole eggs, 2 egg whites scrambled with spinach and 2 slices whole-wheat toast';
            meals.lunch = 'Grilled chicken breast (200g) with 1 cup brown rice and roasted vegetables';
            meals.dinner = 'Lean beef steak or tuna (200g) with 1 large sweet potato and asparagus';
            meals.snack = 'Greek yogurt (200g) with 1 scoop protein powder and a handful of walnuts';
        } else {
            meals.breakfast = '2 Whole-wheat pancakes with 1 sliced banana and 1 tbsp nut butter';
            meals.lunch = 'Turkey and avocado whole-grain wrap with a side of carrot sticks';
            meals.dinner = 'Whole-wheat pasta (1 cup) with turkey meatballs and marinara sauce';
            meals.snack = 'Cottage cheese (150g) with sliced peaches';
        }

        // Apply dietary restrictions with better substitutions
        if (diet === 'vegetarian') {
            meals.lunch = meals.lunch.replace('chicken breast', 'grilled tofu (180g)');
            meals.dinner = meals.dinner.replace('salmon', 'tempeh steaks (180g)').replace('beef steak or tuna', 'lentil & mushroom loaf').replace('turkey meatballs', 'chickpea balls');
        } else if (diet === 'vegan') {
            meals.breakfast = meals.breakfast.replace('3 Whole eggs, 2 egg whites', 'Tofu scramble (200g)').replace('Greek yogurt', 'Coconut yogurt').replace('Cottage cheese', 'Soy yogurt');
            meals.lunch = meals.lunch.replace('chicken breast', 'marinated tempeh').replace('Turkey', 'Hummus and roasted vegetable');
            meals.dinner = meals.dinner.replace('salmon', 'extra-firm tofu').replace('beef steak', 'seitan roast').replace('turkey meatballs', 'black bean balls');
            meals.snack = meals.snack.replace('Greek yogurt', 'Vegan protein shake with almond milk').replace('Cottage cheese', 'Chia seed pudding');
        } else if (diet === 'gluten-free') {
            meals.breakfast = meals.breakfast.replace('whole-wheat toast', 'gluten-free toast').replace('pancakes', 'buckwheat pancakes');
            meals.lunch = meals.lunch.replace('wrap', 'quinoa bowl');
            meals.dinner = meals.dinner.replace('Whole-wheat pasta', 'Brown rice pasta');
        }

        return `
            <div class="metrics">
                <p><strong>Your Stats:</strong> ${height}cm | ${weight}kg | ${age}yrs | ${gender.charAt(0).toUpperCase() + gender.slice(1)}</p>
                <p><strong>Estimated Daily Needs:</strong> ${Math.round(tdee)} kcal (Maintenance)</p>
                <p><strong>Target Intake for ${goal.replace('-', ' ')}:</strong> <span style="color: var(--primary-color); font-weight: bold;">${Math.round(targetCalories)} kcal/day</span></p>
            </div>
            <hr style="border: 0; border-top: 1px solid #ddd; margin: 1.5rem 0;">
            <h3>Your Personalized Meal Plan:</h3>
            <ul>
                <li><strong>Breakfast:</strong> ${meals.breakfast}</li>
                <li><strong>Lunch:</strong> ${meals.lunch}</li>
                <li><strong>Dinner:</strong> ${meals.dinner}</li>
                <li><strong>Snack:</strong> ${meals.snack}</li>
            </ul>
            <p style="font-size: 0.85rem; margin-top: 1.5rem; background: rgba(0,0,0,0.05); padding: 0.75rem; border-radius: 5px;">
                <strong>Pro Tip:</strong> Try to drink at least ${Math.round(weight * 0.033 * 10) / 10} liters of water daily to stay hydrated and support your ${goal.replace('-', ' ')} journey.
            </p>
        `;
    }
});
