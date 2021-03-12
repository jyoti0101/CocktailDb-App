import React, { Component, Fragment } from 'react';
import CocktailList from '../components/cocktail-list';
import FilteredCocktails from '../components/filtered-cocktails';
import Footer from '../components/footer';
import Header from '../components/header';
import axios from 'axios';

class CocktailSection extends Component {
  constructor() {
    super();
    this.state = {
      notFound: false,
      cocktails: null,
      categories: null,
      ingredients: null,
      glasses: null,
      filterResults: null,
    }

    this.getCocktails = this.getCocktails.bind(this);
    this.getIngredients = this.getIngredients.bind(this);
    this.getCategories = this.getCategories.bind(this);
    this.getGlasses = this.getGlasses.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
    this.filterByCategory = this.filterByCategory.bind(this);
    this.filterByGlass = this.filterByGlass.bind(this);
    this.filterByIngredient = this.filterByIngredient.bind(this);
  }

  componentDidMount() {
    this.getCategories();
    this.getIngredients();
    this.getGlasses();
  }

  async getCocktails(searchText) {
    this.setState({
      cocktails: null
    })
    const cocktailData = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + searchText);
    this.setState({
      cocktails: cocktailData.data.drinks,
      notFound: cocktailData.data.drinks ? false : true
    })
  }

  async getIngredients() {
    const ingredientsData = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
    this.setState({
      ingredients: ingredientsData.data.drinks,
    })
  }

  async getCategories() {
    const categoryData = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    this.setState({
      categories: categoryData.data.drinks,
    })
  }

  async getGlasses() {
    const glassesData = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/list.php?g=list');
    this.setState({
      glasses: glassesData.data.drinks,
    })
  }

  async filterByCategory(categoryName) {
    const filteredData = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=' + categoryName);
    this.setState({
      filterResults: filteredData.data.drinks
    })
  }

  async filterByGlass(glassName) {
    const filteredData = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=' + glassName);
    this.setState({
      filterResults: filteredData.data.drinks
    })
  }

  async filterByIngredient(ingredientName) {
    const filteredData = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=' + ingredientName);
    this.setState({
      filterResults: filteredData.data.drinks
    })
  }

  clearSearch() {
    this.setState({
      cocktails: null,
      filterResults: null,
    })
  }

  render() {
    const { cocktails, notFound, categories, glasses, ingredients, filterResults } = this.state;
    return (
      <Fragment>
        {glasses && categories && ingredients &&
          <Header getCocktails={this.getCocktails} 
                  clearSearch={this.clearSearch}
                  filterByIngredient={this.filterByIngredient}
                  filterByGlass={this.filterByGlass}
                  filterByCategory={this.filterByCategory}
                  categories={categories}
                  glasses={glasses}
                  ingredients={ingredients}
                  />
        }
        {cocktails &&
          <CocktailList cocktails={cocktails} />
        }
        {filterResults &&
          <FilteredCocktails cocktails={filterResults} />
        }
        {notFound &&
          <h3 className="text-center my-3 text-danger">
            No cocktails found with that name.
          </h3>
        }
        <Footer />
      </Fragment>
    );
  }
}


export default CocktailSection;