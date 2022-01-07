/* eslint-disable no-undef */
const node_path=require("path");
const template=require("@babel/template");

const template_method=template.smart(`require(%%css_source%%);`);
const defaut_options={
  style_extname:[".scss",".less",".css"],
  css_module_json:(style_file_path)=>{
    return [style_file_path,"json"].join(".")
  }
};

module.exports=function transform_style_import({types}){
  return {
    visitor: {
      ImportDeclaration(path,state){
        const {style_extname,css_module_json}=state.opts?{...defaut_options,...state.opts}:defaut_options;
        const import_source=path.node.source.value;
        const extname=node_path.extname(import_source);
        if(!style_extname.includes(extname)){
          path.skip();
        }else{
          path.node.source.value=css_module_json(import_source);
          const template_transform=template_method({
            css_source:types.stringLiteral(import_source)
          });
          path.insertBefore(template_transform);
        }
      }
    }
  };
};