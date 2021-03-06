import React, {Component, PropTypes} from "react";
import {injectIntl} from "react-intl";
import EventBox from "../common/EventBox";
import EventEdit from "../common/EventEdit";
import Snackbar from "material-ui/Snackbar";
import Chip from "material-ui/Chip";
import {style} from "../../common/constant";

class EventDetail extends Component {
	constructor(props) {
		super(props);
		this.showEventDetail = ::this.showEventDetail;
		this.handleClose = ::this.handleClose;
		this.handleCloseSnack = ::this.handleCloseSnack;
		this.onRemoveEvent = ::this.onRemoveEvent;
	}
	
	componentDidMount() {
		const {loadEventDetails, eventDetail} = this.props;
		loadEventDetails(eventDetail);
	}
	
	handleClose() {
		const {closeCreateDialog} = this.props;
		closeCreateDialog(false);
	}
	
	handleCloseSnack() {
		const {closeSnackBar} = this.props;
		closeSnackBar()
	}
	
	onRemoveEvent(eventId) {
		const {removeEvent} = this.props;
		removeEvent(eventId);
	}
	
	showEventDetail(data) {
		const {
			infoMessage, showInfoMessage, unAttendEvent, attendEvent, userId, updateEvent, intl,
			capacityUpdateChanged, timeUpdateChanged, dateUpdateChanged, descriptionUpdateChanged, titleUpdateChanged
		} = this.props;
		return (
			<div className="events-detail">
				<div className="top__nav">
					<h6 className="att--detail">{intl.formatMessage({"id": "event.detail"})} #{data.id}</h6>
					{data.owner.id === userId ?
						<span onClick={() => this.onRemoveEvent(data.id)}
						      className="remove-event">{intl.formatMessage({"id": "event.delete"})}</span> : null
					}
				</div>
				
				{data.owner.id === userId ?
					<EventEdit data={data} capacityUpdateChanged={capacityUpdateChanged} updateEvent={updateEvent}
					           timeUpdateChanged={timeUpdateChanged} dateUpdateChanged={dateUpdateChanged}
					           descriptionUpdateChanged={descriptionUpdateChanged}
					           titleUpdateChanged={titleUpdateChanged}/>
					:
					<EventBox userId={userId} attendEvent={attendEvent} unAttendEvent={unAttendEvent} data={data}
					          eventDetail={true}/>
				}
				
				<div className="card- attendees">
					<h4>Attendees</h4>
					{data.attendees.map((att, index) => {
						return (
							<div key={index}>
								{att.id === userId ?
									<p className="current-user--attended">{intl.formatMessage({"id": "user"})}</p>
									:
									<Chip key={index} style={style.eventDetail.wrapper}
									      labelStyle={style.eventDetail.labelColor}>
										{att.id === userId ? "You" : att.firstName + " " + att.lastName}
									</Chip>
								}
							</div>
						);
					})}
				</div>
				
				<Snackbar open={showInfoMessage}
				          message={infoMessage}
				          autoHideDuration={3000}
				          onRequestClose={this.handleCloseSnack}/>
			
			</div>
		);
	}
	
	render() {
		const {eventDetail} = this.props;
		return (eventDetail && eventDetail !== null ? this.showEventDetail(eventDetail) : null);
	}
}

EventDetail.PropTypes = {
	"eventDetail": PropTypes.object,
	"loadEventDetails": PropTypes.func,
	"title": PropTypes.string,
	"date": PropTypes.object,
	"description": PropTypes.string,
	"attendEvent": PropTypes.func,
	"unAttendEvent": PropTypes.func,
	"showInfoMessage": PropTypes.bool,
	"infoMessage": PropTypes.string,
	"closeSnackBar": PropTypes.func,
	"userId": PropTypes.string,
	"titleUpdateChanged": PropTypes.func,
	"descriptionUpdateChanged": PropTypes.func,
	"dateUpdateChanged": PropTypes.func,
	"timeUpdateChanged": PropTypes.func,
	"capacityUpdateChanged": PropTypes.func,
	"removeEvent": PropTypes.func,
	"intl": PropTypes.func
};

export default injectIntl(EventDetail);