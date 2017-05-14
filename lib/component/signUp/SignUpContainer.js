import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import {
	USER_LAST_NAME,
	USER_FIRST_NAME,
	PASSWORD_KEY,
	SIGN_UP_FAIL,
	USER_EMAIL,
	SIGN_UP_OK,
	doSignUp,
	firstNameChanged,
	lastNameChanged,
	emailChanged,
	passwordChanged
} from "../../ducks/signUp";

import SignUp from "./SignUp";

const mapStateToProps = (state) => {
	return {
		"firstName": state.signUp[USER_FIRST_NAME],
		"lastName": state.signUp[USER_LAST_NAME],
		"password": state.signUp[PASSWORD_KEY],
		"email": state.signUp[USER_EMAIL],
		"signUpFail": state.signUp[SIGN_UP_FAIL],
		"signUpOk": state.signUp[SIGN_UP_OK]
	};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		doSignUp,
		firstNameChanged,
		lastNameChanged,
		emailChanged,
		passwordChanged,
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);