document.addEventListener('DOMContentLoaded', () => {
    const dietForm = document.getElementById('diet-form');
    const dietPlan = document.getElementById('diet-plan');

    dietForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const goal = document.getElementById('goal').value;
        const diet = document.getElementById('diet').value;

        const recommendation = getRecommendation(goal, diet);

        dietPlan.innerHTML = recommendation;
    });

    function getRecommendation(goal, diet) {
        let recommendation = '<h3>Your Recommended Meals:</h3><ul>';

        if (goal === 'weight-loss') {
            recommendation += '<li>Breakfast: Oatmeal with berries</li>';
            recommendation += '<li>Lunch: Grilled chicken salad</li>';
            recommendation += '<li>Dinner: Baked salmon with steamed vegetables</li>';
        } else if (goal === 'muscle-gain') {
            recommendation += '<li>Breakfast: Scrambled eggs with spinach and whole wheat toast</li>';
            recommendation += '<li>Lunch: Quinoa bowl with black beans, corn, and avocado</li>';
            recommendation += '<li>Dinner: Lean beef with sweet potatoes and broccoli</li>';
        } else {
            recommendation += '<li>Breakfast: Greek yogurt with nuts and fruit</li>';
            recommendation += '<li>Lunch: Turkey and avocado wrap</li>';
            recommendation += '<li>Dinner: Pasta with marinara sauce and a side of vegetables</li>';
        }

        if (diet === 'vegetarian') {
            recommendation = '<h3>Your Recommended Meals:</h3><ul>';
            recommendation += '<li>Breakfast: Tofu scramble</li>';
            recommendation += '<li>Lunch: Lentil soup</li>';
            recommendation += '<li>Dinner: Vegetable stir-fry</li>';
        } else if (diet === 'vegan') {
            recommendation = '<h3>Your Recommended Meals:</h3><ul>';
            recommendation += '<li>Breakfast: Smoothie with plant-based protein powder</li>';
            recommendation += '<li>Lunch: Chickpea salad sandwich</li>';
            recommendation += '<li>Dinner: Black bean burgers</li>';
        } else if (diet === 'gluten-free') {
            recommendation += '<p>All meals are prepared gluten-free.</p>';
        }

        recommendation += '</ul>';

        return recommendation;
    }
});