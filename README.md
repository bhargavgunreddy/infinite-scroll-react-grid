# infinite-scroll-react-grid

Grid using React to demonstrate infinite scrolling

Used webpack dev server to build and run the app.

Plese navigate to "www.bhargavgunreddy.com" to see the running demo

Demo desciption:
===============


1. Grid is built out of reusable components using React.

2. Each cell, row constitues a component, which builds up into final grid component.

3. Data to eacc component is passed through parent i.e. from row to grid and from grid to row

4. When a component updates the state is reset which results in the component being rerendered with updated value.

5. As we scroll to the bottom of the page, next set of records gets added to the component.
