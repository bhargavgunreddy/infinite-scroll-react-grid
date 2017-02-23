"use strict";


export class TableCell extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            editMode : false,
            cellContent : "",
            rowKey: ""
        }
    }

    handleClick (ev){
        // console.log("handle Click", ev);
        if(!this.state.editMode){
            this.setState({editMode: true});
            ev.target.focus();
        }
    }

    componentWillMount (){
        this.setState({
            cellContent: this.props.cellContent,
            rowKey: this.props.rowKey
        });
    }

    handleChange (ev){
        // console.log(" --> ", updatedValue, ev.target.value);
        console.log("Row Changed ->", this.props.rowKey," - ", this.state.rowKey);
        var changedValue = ev.target.value;

        this.props.rowUpdate.call(this.props.rowScope, changedValue);
        this.setState({
            cellContent : changedValue
        });


        //this.props.handleChange.call(this.props.rowScope);
        // this.emit(new Event("updateCell"));
        
    }

    handleBlur (ev){
        // console.log("blur", ev);
        this.setState({editMode: false});
    }

    render (){
        var retString = "";
        var self = this;

        if(this.state.editMode){
            retString = <input type = "text" 
                                value = {this.state.cellContent} 
                                onChange = {this.handleChange.bind(self)}/>    
        }
        else{
            retString = <span>{this.state.cellContent}</span>   
        }

        return <td className = "tableCell" style = {styles.cellStyle}
                    onClick = {this.handleClick.bind(self)}
                    onBlur = {this.handleBlur.bind(self)}>{retString}</td>;
        
    }

}

export class TableRow extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            rowCells : [],
            rowKey : ""
        }
        var self = this;
    }

    handleBlur (ev){
        // console.log("blur", ev);
        this.setState({editMode: false});
    }

    componentWillMount (){
        this.setState({
            rowCells: this.props.rowCells,
            rowKey: this.props.rowKey
        });
    }

    handleChange (){
        // console.log("row changed", this.state.rowKey);
    }

    rowUpdate (par1){
          console.log("row updated", par1, " ", this.state);

         this.state.rowCells[this.state.rowKey-1] = par1;
         console.log(this.state.rowCells[this.state.rowKey-1]);
    }

    constructTableRow (cellItem, index){
        var self = this;
        var cellKey = this.state.rowKey + "_" + index;
        return <TableCell key = {cellKey} 
                            handleChange = {this.handleChange}
                            rowScope = {self}
                            cellContent = {cellItem}
                            rowKey = {this.state.rowKey}
                            rowUpdate = {this.rowUpdate}/>;
    }

    render (){
        var retString = "";
        var self = this;
        return <tr className = "tableRow" 
                    onBlur = {this.handleBlur.bind(self)}>
                    {this.state.rowCells.map(this.constructTableRow.bind(self))}
                </tr>;
        
    }

}

export class TableGrid extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            rows : [],
            headerRow : []
        }
        var self = this;
    }

    handleBlur (ev){
        // console.log("blur", ev);
        this.setState({editMode: false});
    }

    componentWillMount (){
        this.setState({
            rows: this.props.rows,
            headerRow: this.props.headerRow
        });
    }

    constructHeaderCell (headerLabel, index){
        return <th style = {styles.cellStyle} key = {index}>{headerLabel}</th>;

    }

    constructTableRow (rowItem, index){
        var rowKey = rowItem[0]+ " _" + index;
        //console.log(index);
        return <TableRow key ={rowKey} rowKey = {rowKey} onBlur = {this.handleBlur.bind(self)}
                            rowCells = {rowItem}/>;
    }

    handleScroll (){
        console.log("on scroll", );
        var tBody = document.getElementById('tableBody');
        var scrollHeight = tBody.scrollHeight;
        var scrollTop = tBody.scrollTop;
        var bodyHeight = tBody.offsetHeight;


        var tRow = document.getElementsByClassName('tableRow')[0];
        var rowHeight = tRow.offsetHeight;

        if(scrollHeight == scrollTop + bodyHeight){


            //console.log("Last row reached");
            this.fetchNextBatch();
        }


        //console.log( scrollHeight , " " ,scrollTop, " rows ", rowHeight);
    }

    fetchNextBatch(){
        console.log("Total records increased upon fetching next batch");
        var self = this;
        $.ajax({
                type: 'GET',
                url: 'fetch.json',
                
                success: function(res){
                    console.log("rs", res);
                    self.updateRecords(res.data)
                },
                error: function(err){
                    console.log("fail",err);
                    

                }
        });

    }

    updateRecords(data) {

        var updatedData = this.state.rows.concat(data)
        console.log("-->", updatedData, "<->", data);

        this.setState({
            rows: updatedData
        })
    }

    render (){
        var retString = "";
        var self = this;

        return <table className = "tableGrid" 
                        onBlur = {this.handleBlur.bind(self)}>
                    <thead style={styles.thead}>
                        <tr>
                            {this.state.headerRow.map(this.constructHeaderCell.bind(self))}
                        </tr>
                    </thead>
                    <tbody style={styles.tbody} id = "tableBody" ref = "tbody" onScroll = {this.handleScroll.bind(self)}>
                        {this.state.rows.map(this.constructTableRow.bind(self))}
                        <tr id = "loader">
                                <td colSpan = "2"> LOADER </td>
                        </tr>
                    </tbody>

                    
                </table>;
        
    }

}

var rowContents = [
                    [ 1,  "Bhargav",  25,  "Male"],
                    [ 2,  "Bhargav1",  26, "Female"],
                    [ 3,  "Bhargav2",  27, "Male"],
                    [ 4,  "Bhargav3",  28, "Female"],
                    [ 5,  "Bhargav4",  29, "Male"],
                    [ 6,  "Bhargav5",  30, "Female"],
                    [ 7,  "Bhargav6",  31, "Male"],
                    [ 8,  "Bhargav7",  32, "Female"],
                    [ 9,  "Bhargav8",  33, "Male"],
                    [ 11,  "Bhargav",  25,  "Male"],
                    [ 12,  "Bhargav1",  26, "Female"],
                    [ 13,  "Bhargav2",  27, "Male"],
                    [ 14,  "Bhargav3",  28, "Female"],
                    [ 15,  "Bhargav4",  29, "Male"],
                    [ 16,  "Bhargav5",  30, "Female"],
                    [ 17,  "Bhargav6",  31, "Male"],
                    [ 18,  "Bhargav7",  32, "Female"],
                    [ 19,  "Bhargav8",  33, "Male"],
                    [ 21,  "Bhargav",  25,  "Male"],
                    [ 22,  "Bhargav1",  26, "Female"],
                    [ 23,  "Bhargav2",  27, "Male"],
                    [ 24,  "Bhargav3",  28, "Female"],
                    [ 25,  "Bhargav4",  29, "Male"],
                    [ 26,  "Bhargav5",  30, "Female"],
                    [ 27,  "Bhargav6",  31, "Male"],
                    [ 28,  "Bhargav7",  32, "Female"],
                    [ 29,  "Bhargav8",  33, "Male"]
            ];

        
var headerRow = ["Index", "Name", "Age", "Gender"];

const styles = {
    "cellStyle": {
        width: "125px",
        height: "35px",
        border: "1px solid",
        textAlign: "center"
    },
    "tbody":{
        display: "block",
        overflow: "scroll",
        height: "270px"
    },
    "thead":{
        display: "block"
    }
};

ReactDOM.render(<TableGrid rows = {rowContents} headerRow = {headerRow}/>, document.getElementById('grid'));
