import React from 'react';
import FailureModal from '../../../components/FailureModal';

const FailureMod = () => (
    <FailureModal visible={this.state.failure} _toggleView={this.showFailureModal} 
        subtitle="Request Submitted Successfully"
        smallText={`Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out prints'}`}/>
)
