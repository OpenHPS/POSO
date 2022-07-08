# POSO: A Generic Positioning System Ontology
*POSO is a generic ontology positioning system ontology. Other than many geospatial ontologies, POSO focuses on the semantics needed to express a positioning system, their techiques and the location data along with other information it can output.*
## Repository Contents
- `/1.0/`: POSO 1.0 ontology and related modules
    - `/1.0/poso.ttl`: POSO core ontolog
    - `/1.0/common/poso-common.ttl`: POSO-common ontology with individuals for algorithms, techniques and existing systems
    - `/1.0/m3lite/poso-m3lite.ttl`: POSO-m3lite alignment (Work In Progress)
    - `/1.0/hdgi/poso-hdgi.ttl`: POSO-hdgi alignment (Work In Progress)
- `/docs/`: Documentation related files for the wiki
    - `/docs/images/`: POSO ontology documentation images
- `/website/`: Website and build scripts for deployment

## Documentation
Documentation is provided using WIDOCO [1] and generated in the `./website` directory upon building the website.

**POSO Ontology (en)**: [https://openhps.github.io/POSO/1.0/en/](https://openhps.github.io/POSO/1.0/en/)\
**POSO-common module (en)**: [https://openhps.github.io/POSO/1.0/common/en/](https://openhps.github.io/POSO/1.0/common/en/)

![](docs/images/systems_and_procedures.svg)

## License
POSO is licensed under the [MIT license](LICENSE) and maintained by the Web & Information Systems Engineering Lab at the Vrije Universiteit Brussel.

## References
*This list of references is only used within this README document. For more references on design choices in the POSO ontology, please refer to the paper and its references.*
1. Garijo, D. (2017, October). WIDOCO: a wizard for documenting ontologies. In International Semantic Web Conference (pp. 94-102). Springer, Cham.