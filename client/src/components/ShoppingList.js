import React from 'react';
import { connect } from 'react-redux';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import uuid from 'uuid';
import { getItems } from '../actions/itemActions';
import PropTypes from 'prop-types';

class ShoppingList extends React.Component {

  componentDidMount() {
    this.props.getItems();
  }

  render() {
    const { items } = this.props.item;
    return (
      <Container>
        <Button
          color='dark'
          style={{ marginTop: '2rem', marginBottom: '2rem' }}
          onClick={() => {
            const name = prompt('Enter Item');
            if (name) {
              this.setState(state => ({
                items: [...state.items, { id: uuid(), name }]
              }));
            }
          }}>
          Add Item
        </Button>
        <ListGroup>
          <TransitionGroup classname='shopping-list'>
            {
              items.map(({ id, name }) => (
                <CSSTransition key={id} timeout={500} classNames='fade'>
                  <ListGroupItem>
                    <Button
                      className='remove-btn'
                      color='danger'
                      size='sm'
                      onClick={() => {
                        this.setState(state => ({
                          items: state.items.filter(item => item.id !== id)
                        }));
                      }}
                    >
                      &times;
                    </Button>
                    {name}
                  </ListGroupItem>
                </CSSTransition>
              ))
            }
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return { item: state.item }
}

export default connect(mapStateToProps, { getItems })(ShoppingList);