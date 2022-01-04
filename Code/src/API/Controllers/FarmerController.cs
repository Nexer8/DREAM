﻿using BusinessLogic.Dtos.Farmer;
using BusinessLogic.Queries;
using BusinessLogic.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/farmer")]
    [ApiController]
    public class FarmerController : ControllerBase
    {
        private readonly IFarmService _farmService;
        private readonly IFarmerService _farmerService;

        public FarmerController(IFarmService farmService, IFarmerService farmerService)
        {
            _farmService = farmService;
            _farmerService = farmerService;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetFarmerByIdAsync([FromRoute] int farmerId)
        {
            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> GetFarmersAsync([FromRoute] FarmersQuery query)
        {
            return Ok();
        }

        [HttpPost("{id}/note")]
        public async Task<IActionResult> PostFarmerNoteAsync([FromRoute] int farmerId, CreateNoteDto createNoteDto)
        {
            return Ok();
        }

        [HttpGet("{id}/note")]
        public async Task<IActionResult> GetFarmerNotesAsync([FromRoute] int farmerId)
        {
            return Ok();
        }

        [HttpPost("{id}/farm/production-data")]
        public async Task<IActionResult> PostProductionDataAsync([FromRoute] int farmerId, [FromBody] CreateProductionDataDto createProductionData)
        {
            return Ok();
        }

        [HttpPut("farm/production-data/{id}")]
        public async Task<IActionResult> PutProductionDataAsync([FromRoute] int productionDataId, [FromBody] EditProductionDataDto editProductionData)
        {
            return Ok();
        }

        [HttpGet("{id}/farm/production-data")]
        public async Task<IActionResult> GetProductionDataAsync([FromRoute] int farmerId, [FromBody] ProductionDataQuery query)
        {
            return Ok();
        }

        [HttpGet("{id}/farm/sensor-system")]
        public async Task<IActionResult> GetSensorSystemDataAsync([FromRoute] int farmerId, [FromBody] SensorSystemQuery query)
        {
            return Ok();
        }

        [HttpGet("{id}/farm/irrigation-system")]
        public async Task<IActionResult> GetIrrigatoinSystemionDataAsync([FromRoute] int farmerId, [FromBody] IrrigationSystemQuery query)
        {
            return Ok();
        }
    }
}
