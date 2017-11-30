require('better-log/install');

module.exports = function ({ types: t }) {
	return {
		visitor: {
			ExpressionStatement(path) {
				const statementObj = path.node.expression.callee;
				if(statementObj !== undefined && statementObj.object !== undefined && statementObj.object.name !== undefined)
					if(statementObj.object.name === 'console' && statementObj.property.name === 'log'){
						path.remove();	
				}
			}
		}
	};
};