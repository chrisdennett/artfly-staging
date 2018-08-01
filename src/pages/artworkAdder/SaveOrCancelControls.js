import React from 'react';
import { Grid, GridCell } from 'rmwc/Grid';
import { Button, ButtonIcon } from 'rmwc/Button';

const SaveOrCancelControls = ({ onSave, onCancel }) => {

    return (
        <Grid>
            <GridCell phone="2" desktop="6" tablet="4">
                <Button onClick={onSave}
                        raised>
                    <ButtonIcon use={'save'}/>
                    Save
                </Button>
            </GridCell>

            <GridCell phone="2" desktop="6" tablet="4">
                <Button onClick={onCancel}
                        raised
                        theme={'secondary-bg'}>
                    <ButtonIcon use={'delete'}/>
                    Cancel
                </Button>
            </GridCell>
        </Grid>
    )
};

export default SaveOrCancelControls;