import './styles.css';
import React, { Component, Fragment } from 'react';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      searchText: '',
      selectedGlass: null,
      selectedIngredient: null,
      selectedCategory: null,
    }
    this.getCockTailData = this.getCockTailData.bind(this);
    this.clearSearchInput = this.clearSearchInput.bind(this);
    this.handleChangeIngredient = this.handleChangeIngredient.bind(this);
    this.handleChangeGlass = this.handleChangeGlass.bind(this);
    this.handleChangeCategory = this.handleChangeCategory.bind(this);
  }

  handleChangeCategory(e) {
    this.setState({ selectedCategory: e.target.value });
  }

  handleChangeGlass(e) {
    this.setState({ selectedGlass: e.target.value });
  }

  handleChangeIngredient(e) {
    this.setState({ selectedIngredient: e.target.value });
  }

  handleChange = (e) => {
    this.setState({ searchText: e.target.value });
  };

  getCockTailData() {
    const { searchText } = this.state;  
    this.props.getCocktails(searchText);  
  }

  clearSearchInput() {
    this.setState({
      searchText: '',
    })
    this.props.clearSearch();
  }

  render() {
    const { searchText, selectedGlass, selectedCategory, selectedIngredient } = this.state;
    const { glasses, categories, ingredients } = this.props; 
    return (
      <Fragment>
       <div className="container my-3">
         <div className="row">
          <div className="form-group my-3 col-md-3">
              <label htmlFor="search_by_name">Search Cocktail By Name</label>
              <input type="text" id="search_by_name" className="form-control" placeholder="Search by cock-tail name" onChange={this.handleChange} />
              <button className="rounded shadow btn btn-secondary" onClick={() => {this.getCockTailData(searchText)}}>
              Search Cocktail By Name
          </button>
         </div>
         

          <div className="form-group my-3 col-md-3">
            <label htmlFor="search_by_category">Search Cocktail By Category</label>
            <select id="search_by_category" className="form-control" onChange={this.handleChangeCategory}>
              {categories.map((item, index) => (
                <option key={index} value={item.strCategory}>
                  {item.strCategory}
                </option>
              ))}
            </select>
            <button className="rounded shadow btn btn-secondary" onClick={() => {this.props.filterByCategory(selectedCategory)}}>
              Search Cocktail By Category
          </button>
          </div>
          

          <div className="form-group my-3 col-md-3">
            <label htmlFor="search_by_glasses">Search Cocktail By Glasses</label>
            <select id="search_by_glasses" className="form-control" onChange={this.handleChangeGlass}>
              {glasses.map((item, index) => (
                <option key={index} value={item.strGlass}>
                  {item.strGlass}
                </option>
              ))}
            </select>
            <button className="rounded shadow btn btn-secondary" onClick={() => {this.props.filterByGlass(selectedGlass)}}>
              Search Cocktail By Glasses
          </button>
          </div>
         

          <div className="form-group my-3 col-md-3">
            <label htmlFor="search_by_ingredients">Search Cocktail By Ingredients</label>
            <select id="search_by_ingredients" className="form-control" onChange={this.handleChangeIngredient}>
              {ingredients.map((item, index) => (
                <option key={index} value={item.strIngredient1}>
                  {item.strIngredient1}
                </option>
              ))}
            </select>
            <button className="rounded shadow btn btn-secondary" onClick={() => {this.props.filterByIngredient(selectedIngredient)}}>
              Search Cocktail By Ingredients
          </button>
          <button className="rounded shadow btn btn-warning ml-2" onClick={() => {this.clearSearchInput()}}>
              Clear Search Results
          </button>
          </div>
          
       </div></div>
      </Fragment>
    );
  }
}

export default Header;
