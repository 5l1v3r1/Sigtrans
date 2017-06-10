/**
 * Created by natal on 05/06/17.
 */

<Sidebar pinned={ this.state.sidebarPinned } width={ 5 }>
    <div><IconButton icon='close' onClick={ this.toggleSidebar }/></div>
    <div style={{flex: 1}}>
        <p>Supplemental content goes here.</p>
    </div>
</Sidebar>