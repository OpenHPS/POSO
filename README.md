# POSO: A Generic Positioning System Ontology

<div style="margin-left: auto; margin-right: auto; width: 30%">
    <img src="./1.1/docs/images/logo.svg" width="100%">
</div>

*POSO is a generic ontology positioning system ontology. Other than many geospatial ontologies, POSO focuses on the semantics needed to express a positioning system, their techiques and the location data along with other information it can output.*
## Repository Contents
- `/1.1/`: POSO 1.1 ontology and related modules
    - `/1.1/docs/`: Documentation related files for the wiki
        - `/1.1/docs/images/`: POSO ontology documentation images
    - `/1.1/poso.ttl`: POSO core ontolog
    - `/1.1/common/poso-common.ttl`: POSO-common ontology with individuals for algorithms, techniques and existing systems
    - `/1.0/m3lite/poso-m3lite.ttl`: POSO-m3lite alignment
- `/1.0/`: [Deprecated] POSO 1.0 ontology and related modules
- `/website/`: Website and build scripts for deployment

## Documentation
Ontology documentation is provided using WIDOCO [1] and generated in the `./website` directory upon building the website.

**POSO Ontology (en)**: [https://openhps.github.io/POSO/1.1/en/](https://openhps.github.io/POSO/1.1/en/)\
**POSO-common module (en)**: [https://openhps.github.io/POSO/1.1/common/en/](https://openhps.github.io/POSO/1.1/common/en/)

![](1.1/docs/images/systems_and_procedures.svg)

## Methodology
The POSO ontology has been designed with the common data requirements of various positioning system technologies, datasets and frame-
works in mind to cover all types of systems without overcomplicating the modelling of the data. 
An initial validation has further been conducted based on the OpenHPS framework using the [@openhps/rdf](https://github.com/OpenHPS/openhps-rdf) module.

## License
POSO is licensed under the [MIT license](LICENSE) and maintained by the Web & Information Systems Engineering Lab at the Vrije Universiteit Brussel.

## References
*This list of references is only used within this README document. For more references on design choices in the POSO ontology, please refer to the paper and its references.*
1. Garijo, D. (2017, October). WIDOCO: a wizard for documenting ontologies. In International Semantic Web Conference (pp. 94-102). Springer, Cham.