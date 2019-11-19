import React from 'react';
import { withRouter } from 'react-router-dom';

// Components
import Button from '../Button';

// Constants
import { ID_DB, TM_DB, LOCAL_DB } from '../../../constants';

// Style
import './SwitchDB.css';

const ButtonSwitchDB = (props) => {
   const { history, match, match: {params: {[ID_DB]: id} }} = props;
   const text = id ? id.toUpperCase() : TM_DB.toLocaleUpperCase();

   const handleOnClick = () => {
      const { params: { [ID_DB]: id_db }, url } = match;
      const array = url.split('/');
      let path = "";
      let last_elem = array.length;

      if (last_elem < 2) return;
      if (id_db === TM_DB || id_db === LOCAL_DB)
         last_elem = last_elem - 1;
      array[last_elem] = (id_db === LOCAL_DB) ? TM_DB : LOCAL_DB;
      array.forEach(element => {
         if (element !== "")
            path += '/' + element;
      });
      history.push(path);
      window.location.reload();
   }

   return (
      <div className="container-switch-button">
         <Button onClick={handleOnClick} text={text} />
      </div>
   );
};

export default withRouter(ButtonSwitchDB);