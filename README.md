# POSO: A Generic Positioning System Ontology
*POSO is a generic ontology positioning system ontology. Other than many geospatial ontologies, POSO focuses on 
the semantics needed to express a position.*

> :warning: **Anonymised Repository**: The repository and contents are anonymised. Copyright information is redacted from this README and the metadata in the ontology. Please do not use the version of the ontology provided in this repository. The permanent URL (purl) used in this ontology is directed to the anonymised version.

## Repository Contents
- `/1.0/`: POSO 1.0 ontology and related modules
    - `/1.0/poso.ttl`: POSO core ontology
    - `/1.0/catelog-v001.xml`: Protege catalog used for the Owlery API
    - `/1.0/common/poso-common.ttl`: POSO-common ontology with individuals for algorithms, techniques and existing systems
- `/docker/`: Docker related files
    - `/docker/owlery/application.conf`: Owlery API configuration
    - `/docker/widoco/Dockerfile`: WIDOCO document generator docker file
- `/docs/`: Documentation related files
    - `/docs/images/`: POSO ontology documentation images
    - `/docs/generated/`: Generated documentation of POSO
- `/examples/`: Examples
- `docker-compose.yml`: Docker services

## Classes

### Stimulus
A positioning system can be triggered by movement. We identify linear and angular movement as two possible events that can
cause an update of the output position.

### Procedure
> A workflow, protocol, plan, algorithm, or computational method specifying how to make an Observation, create a Sample, or make a change to the state of the world (via an Actuator). A Procedure is re-usable, and might be involved in many Observations, Samplings, or Actuations. It explains the steps to be carried out to arrive at reproducible Results.

In the context of a positioning system, a procedure is an algorithm or computational method to sample sensor data to a position. POSO offers general classes for the different positioning techniques, and individuals for well known positioning algorithms in the `poso-common` module.

### Observable Properties
> An observable quality (property, characteristic) of a FeatureOfInterest.

POSO aims to observe the position, orientation and related properties needed in a positioning system. Classes are available for a position (i.e. absolute or relative), orientation and velocity.

## Properties

## Individuals

### Positioning Systems
A positioning system is an established system for obtaining a position. Existing satelite systems such as GPS and GLONASS exist that can be used. `poso-common` already provides these systems as existing individuals.

## Documentation
Documentation is provided using WIDOCO [2]. An Owlery configuration is provided

## License
POSO is licensed under the [MIT license](LICENSE) and maintained by the Web & Information Systems Engineering Lab at the Vrije Universiteit Brussel.

## References
*This list of references is only used within this README document. For more references on design choices in the POSO ontology, please refer to the paper and its references.*
1. Haller, A., Janowicz, K., Cox, S. J., Lefrançois, M., Taylor, K., Le Phuoc, D., ... & Stadler, C. (2019). The modular SSN ontology: A joint W3C and OGC standard specifying the semantics of sensors, observations, sampling, and actuation. Semantic Web, 10(1), 9-32.
2. Garijo, D. (2017, October). WIDOCO: a wizard for documenting ontologies. In International Semantic Web Conference (pp. 94-102). Springer, Cham.