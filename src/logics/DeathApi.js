/**
 * Created by natal on 05/06/17.
 */
import {listDeathEvents, toggleS} from '../actions/actionCreator'

//     $.ajax({
//         url: 'https://ocorrencias-teste-api.herokuapp.com/api/options',
//         dataType: 'json',
//         type: 'GET',
//         crossDomain: true,
//         success: function (res) {
//             this.setState({options: res});
//         }.bind(this)
//     });

export default class DeathApi {
    static listDeaths(loading) {
        return dispatch => {
            // componentDidMount(){
            //     this.setState({loading: true});
            //     $.ajax({
            //         url: 'https://ocorrencias-teste-api.herokuapp.com/api/events/open',
            //         dataType: 'json',
            //         type: 'GET',
            //         crossDomain: true,
            //         success: function (res) {
            //             this.setState({
            //                 data: res,
            //                 loading: false,
            //             })
            //         }.bind(this)
            //     });
            //     PubSub.subscribe('update-events', function (topicName, newData) {
            //         this.setState({data: newData, showModal: false, selectedDeath: ''});
            //     }.bind(this));
            // }
            fetch(`https://ocorrencias-teste-api.herokuapp.com/api/events/open`)
                .then(response => {
                    loading = false;
                    response.json()
                })
                .then(deathEvents => {
                    dispatch(listDeathEvents(deathEvents));
                    return deathEvents;
                });
        }
    }

    static toggleSidebar() {
        return dispatch => {
            return dispatch(toggleS());
        }
    }
}