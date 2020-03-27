import React from 'react';
// styles
import './editMiniNav_styles.css';
// ui
import { Fab } from "@rmwc/fab";
import { IconButton } from '@rmwc/icon-button';

const EditMiniNav = ({
                         onNext,
                         onPrevious,
                         onFinish,
                         disablePrevious,
                         showFinishButton,
                         hasChanges
                     }) => {

    const showNextButton = !showFinishButton;
    const finishIcon = hasChanges ? "save" : "navigate_next";


    return (
        <div className={'editMiniNav'}>

            <div className={'editMiniNav--navButts'}>
                {!disablePrevious &&
                <IconButton icon="navigate_before"
                            label="Rate this!"
                            onClick={onPrevious}
                            className={`editMiniNav--prev ${disablePrevious && 'editMiniNav--disabled'}`}/>
                }

                {disablePrevious &&
                <IconButton icon="navigate_before"
                            label="Rate this!"
                            disabled={true}/>
                }

                {showFinishButton &&
                <Fab icon={finishIcon}
                     mini
                     label={'Finish'}
                     onClick={onFinish}
                     className={'editMiniNav--next'}/>
                }

                {showNextButton &&
                <Fab icon="navigate_next"
                     theme={'primaryBg'}
                     mini
                     label={'next'}
                     onClick={onNext}
                     className={'editMiniNav--next'}/>
                }
            </div>
        </div>
    )
};

export default EditMiniNav;