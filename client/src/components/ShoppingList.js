import React from 'react';
import { connect } from 'react-redux';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { getItems, deleteItem, addItem } from '../actions/itemActions';

class ShoppingList extends React.Component {

  componentDidMount() {
    this.props.getItems();
  }

  onDeleteClick = id => {
    this.props.deleteItem(id);
  };

  render() {
    const { items } = this.props.item;

    return (
      <Container>
        <ListGroup>
          <TransitionGroup className='shopping-list'>
            {
              items.map(({ _id, name }) => (
                <CSSTransition key={_id} timeout={500} classNames='fade'>
                  <ListGroupItem>
                    {this.props.isAuthenticated ? <Button
                      className='remove-btn'
                      color='danger'
                      size='sm'
                      onClick={() => this.onDeleteClick(_id)}
                    >
                      &times;
                    </Button>
                      : null}
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

const mapStateToProps = (state) => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { getItems, deleteItem, addItem })(ShoppingList);