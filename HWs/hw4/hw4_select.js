const items = [
    {
        name: "apple",
        category: "fruit"
    },
    {
        name: "Cucumber",
        category: "vegetable"
    },
    {
        name: "Banana",
        category: "fruit"
    },
    {
        name: "Celery",
        category: "vegetable"
    },
    {
        name: "orange",
        category: "fruit"
    },
    {
        name: "sausage",
        category: "meat"
    },
    {
        name: "bacon",
        category: "meat"
    }
];

var categories = {};

for(const item of items) {
    if(!categories[item.category]) {
        categories[item.category] = [item.name];
    }
    else {
        categories[item.category].push(item.name);
    }
}

function createChildOptions(parent, items) {
    for(const itemName of items) {
        const option = document.createElement('option');
        option.value = itemName;
        option.text = itemName;
        parent.appendChild(option);
    }
}

function setHeading(text) {
    const heading = document.getElementById('heading')
    heading.innerHTML = text
}

document.addEventListener('DOMContentLoaded', function () {
    const select_items = document.getElementById('item');
    const select_categories = document.getElementById('category');

    createChildOptions(select_categories, Object.keys(categories));
    createChildOptions(select_items, categories[select_categories.value]);
    setHeading(select_items.value);

    select_categories.addEventListener('change', function () {
        select_items.innerHTML = '';
        createChildOptions(select_items, categories[select_categories.value]);
        setHeading(select_items.value);
    })
    select_items.addEventListener('change', function () {
        setHeading(select_items.value);
    })
});