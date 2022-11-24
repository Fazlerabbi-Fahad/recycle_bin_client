import React from 'react';
import Banner from '../Shared/Banner/Banner';

const Blog = () => {
    return (
        <div>
            <Banner>
                <h1 className="mb-5 text-5xl font-bold text-white uppercase">Blog</h1>
                <p className="mb-5 text-white">Learn and Fly</p>
            </Banner>
            <div className='bg-neutral'>
                <ul>
                    <li className='p-10'>
                        <h3 className='text-2xl font-bold text-white'>1.What are the different ways to manage a state in a React application?</h3>
                        <p className='text-white py-5'>With React, you won’t modify the UI from code directly. For example, you won’t write commands like “disable the button”, “enable the button”, “show the success message”, etc. Instead, you will describe the UI you want to see for the different visual states of your component (“initial state”, “typing state”, “success state”), and then trigger the state changes in response to user input. This is similar to how designers think about UI.

                            Here is a quiz form built using React. Note how it uses the status state variable to determine whether to enable or disable the submit button, and whether to show the success message instead.</p>
                    </li>
                    <li className='p-10'>
                        <h3 className='text-2xl font-bold text-white'>2.How does prototypical inheritance work?</h3>
                        <p className='text-white py-5'>The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object. Traditionally, in order to get and set the [[Prototype]] of an object, we use Object. getPrototypeOf and Object.</p>
                    </li>
                    <li className='p-10'>
                        <h3 className='text-2xl font-bold text-white'>3.What is a unit test? Why should we write unit tests?</h3>
                        <p className='text-white py-5'>The main objective of unit testing is to isolate written code to test and determine if it works as intended. Unit testing is an important step in the development process, because if done correctly, it can help detect early flaws in code which may be more difficult to find in later testing stages.</p>
                    </li>
                    <li className='p-10'>
                        <h3 className='text-2xl font-bold text-white'>4.Difference React vs. Angular vs. Vue?</h3>
                        <p className='text-white py-5'>Vue provides higher customizability and hence is easier to learn than Angular or React. Further, Vue has an overlap with Angular and React with respect to their functionality like the use of components. Hence, the transition to Vue from either of the two is an easy option.</p>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Blog;