# Changes in v1.1

## POSO
### Breaking changes
- `poso:Movement`, `poso:LinearMovement`, `poso:AngularMovement` are now `poso:Motion`, `poso:LinearMotion`, `poso:AngularMotion` respectively to align with the genericness of the ontology. These are stimuli that can be applied to a physical object to trigger new observations.
- `poso:Angulation` is now a parent class of `poso:Triangulation` as opposed to a sibling class. This is to reflect the fact that `poso:Triangulation` is a specific type of `poso:Angulation`.
- `poso:Lateration` and its subclasses are now part of `poso:PositioningTechniques` as opposed to be a sibling class of `poso:Triangulation`. This is to reflect the fact that lateration does not involve angles.
- `poso:Odometry` and its subclasses are now part of `poso:DeadReckoning`.

### Additions
- `poso:HybridDeployment` is a new class that represents a deployment that works both in indoor and outdoor environments.
- `poso:NormalizationProcedure` is a calibration procedure that is used to normalize the measurements of a sensor.
    - `poso:CalibrationOffsetProcedure` and `poso:CalibrationMagnitudeProcedure` are moved to be subclasses of `poso:NormalizationProcedure`.
- Added beamforming as an algorithm
- `poso:Trilateration` is added next to the already existing `poso:Multilateration`. This is to distinguish between techniques that use precisely 3-4 reference objects and those that use more than 4 reference objects.

### Deletions
*Apart from renamed classes there are no deletions*