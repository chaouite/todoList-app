import { useState,useEffect } from 'react';

function CategoryFilter(props  ) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    setSelectedCategory(props.showAllCategories ? 'all' : selectedCategory);
  }, [props.showAllCategories]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    props.categoryHandler(event.target.value);
    props.showAll(false)
  };

  return (
    <>
      <form>
        <label> Caterogies: </label>
        <input
          type="radio"
          name="category"
          value="all"
          checked={selectedCategory === 'all'}
          onChange={handleCategoryChange}
        />
        All
        <input
          type="radio"
          name="category"
          value="work"
          checked={selectedCategory === 'work'}
          onChange={handleCategoryChange}
        />
        Work
        <input
          type="radio"
          name="category"
          value="personal"
          checked={selectedCategory === 'personal'}
          onChange={handleCategoryChange}
        />
        Personal
        <input
          type="radio"
          name="category"
          value="studies"
          checked={selectedCategory === 'studies'}
          onChange={handleCategoryChange}
        />
        Studies
      </form>
    </>
  );
}

export default CategoryFilter;