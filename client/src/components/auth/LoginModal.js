import React from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert
} from 'reactstrap';

import { connect } from 'react-redux';
import { logIn } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';


class LoginModal extends React.Component {
  state = {
    modal: false,
    email: '',
    password: '',
    msg: null
  }

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      //Check for register error
      if (error.id === 'LOGIN_FAIL') {
        this.setState({
          msg: error.msg.msg
        })
      } else {
        this.setState({ msg: null })
      }
    }

    if (this.state.modal && isAuthenticated) {
      this.toggle();
    }
  }

  toggle = () => {
    this.props.clearErrors();

    this.setState({
      modal: !this.state.modal
    });
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  onSubmit = (event) => {
    event.preventDefault();

    const { email, password } = this.state;

    const user = { email, password };

    this.props.logIn(user);
  }

  render() {
    return (
      <div>
        <NavLink onClick={this.toggle} href='#'>
          Log In
        </NavLink>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            Log In
          </ModalHeader>
          <ModalBody>
            {this.state.msg ? <Alert color='danger'>{this.state.msg}</Alert> : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for='email'>
                  Email
                </Label>
                <Input type='email' name='email' id='email' placeholder='Email' className='mb-3' onChange={this.onChange} />

                <Label for='password'>
                  Password
                </Label>
                <Input type='password' name='password' id='password' placeholder='Password' className='mb-3' onChange={this.onChange} />

                <Button color='dark' style={{ marginTop: '2rem' }} block>Log In</Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
})

export default connect(mapStateToProps, { logIn, clearErrors })(LoginModal);