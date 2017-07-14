/**
 * Created by natal on 01/06/17.
 */

import {List} from 'immutable';

export function death(state = new List(), action) {
    if (action.type === 'TOGGLEDEATH') {

        const drawerDeath = !state.drawerDeath;
        return Object.assign({}, state, {drawerDeath});
    }
    if (action.type === 'TOGGLESIDEBAR') {
        handleToggle(e);
        {
            if (!this.state.selectedDeath || !this.state.showModal) {
                this.setState({selectedDeath: this.state.data[e.target.id - 1]});
            }
            this.setState({showModal: !this.state.showModal});
        }

        const sidebar = !state.sidebar;
        return Object.assign({}, state, {sidebar});
    }

    return state;
}