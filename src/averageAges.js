'use strict';
/**
 * Implement calculateMenAverageAge function
 *
 * Function returns average age of men in array. If `century` is specified then
 * function calculates average age only for men who died in this century
 *
 * To calculate century:
 * Divide year of person's death by 100: Math.ceil(person.died / 100)
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */

function calculatePersonAverageAge(persons) {
  const personsAgeSum = persons.map(person => person.died - person.born).reduce((sum, age) => age + sum, 0)
  return personsAgeSum/persons.length;
}

function calculateMenAverageAge(persons, century) {
  const men  = persons.filter(person => person.sex === 'm');
  const menArrayForCalc = century? men.filter(man => Math.ceil(man.died / 100) === century) : men;
    
  return calculatePersonAverageAge(menArrayForCalc);
  
    // write code here
    // learn how to use array methods like .filter .map .some .every .find .reduce
    // avoid using loop and forEach
    // replace `if ()` statement with &&, || or ?:
    // without nesting
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find someone who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */

function calculateWomenAverageAge(persons, withChildren) {
  const women = persons.filter(person => person.sex === 'f');
  const womenArrForCalc  = (withChildren && women.filter(woman => {
      return people.find(person => person.mother === woman.name);
  })) || women;
  
  return calculatePersonAverageAge(womenArrForCalc);
}
/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a child and his or her
 * mother in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for sons and their mothers.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */

function calculateAverageAgeDiff(persons, onlyWithSon) {
  const women = persons.filter(person => person.sex === 'f');
  const children = onlyWithSon? persons.filter(person => person.sex === 'm' && person.mother !== null) :
    persons.filter(person => person.mother !== null);
  const childrenWithMum = children.filter(child => {
    return women.find(woman => child.mother === woman.name)
  });

  const averageAgeDiff = childrenWithMum.map(child => {
    const mum = women.find(woman => {
    	return child.mother === woman.name
    });
    return child.born - mum.born;
  });
  
  const diff = averageAgeDiff.reduce((sum, diff) => diff + sum, 0)
   return diff/childrenWithMum.length;
};

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
