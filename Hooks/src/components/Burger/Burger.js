import React from 'react'
import './Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const Burger = props => {
    let classes = 'Burger'

    let transformedIngredients = Object.keys(props.ingredients)
        .map(type => {
            const result = []

            for (let i = 0; i < props.ingredients[type]; i++) {
                result.push(<BurgerIngredient type={type} key={type+i}/>)
            }
            return result
        }).reduce((array, element) => { 
        return [...array, ...element]
    },[])   

   if (transformedIngredients.length === 0 ) {
       transformedIngredients = <p>Choose your ingredients</p>
   }
    

    return (
        <div className={classes}>
            <BurgerIngredient type='bread-top'/>
            {transformedIngredients}
            <BurgerIngredient type='bread-bottom'/>
        </div>
    )
}

export default Burger