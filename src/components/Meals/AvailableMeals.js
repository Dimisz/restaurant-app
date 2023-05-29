import { useEffect, useState } from 'react';
import styles from './AvailableMeals.module.css';
import Card from '../UI/Card/Card';
import MealItem from './MealItem/MealItem';

export default function AvailableMeals(){
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  
  useEffect(() => {
    setIsLoading(true);
    // console.log('start loading');
    fetch('https://react-restaurant-app-d1d55-default-rtdb.firebaseio.com/meals.json')
    .then((res) => res.json())
    .then((data) => {
      const mealsData = [];
      for(let key in data){
        mealsData.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price
        });
      }
      setMeals(mealsData);
      
      setIsLoading(false);
      // console.log('end loading');
    })
    .catch((e) => console.log(e));
  },[])

  const renderedMeals = meals.map((meal) => {
    return <MealItem key={meal.id} meal={meal} />;
  });
  
  return(
    <>
    {isLoading
      ?
      <section className={styles.spinner}></section>
      :
      <section className={styles.meals}>
          <Card>
          <ul>
            {renderedMeals}
          </ul>
        </Card>
      </section>
    }
    </>
  );
}